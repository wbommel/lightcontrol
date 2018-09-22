/**
 * Database format descriptions
 *
 * From / To format:
 *  12345678901234567890
 *  YYYY;MM;DD;hh;mm
 *
 * Example: Every day (depending on Weekdays field) from 08:00 to 11:00
 *  From: "0000;01;01;08;00"
 *  To  : "9999;12;31;11;00"
 *
 *
 *
 * Weekdays format:
 *  ----------------------------------
 *  Weekday Su|Mo|Tu|We| |Th|Fr|Sa|---
 *  ----------------------------------
 *  Value    1| 2| 4| 8| |16|32|64|128
 *  ==================================
 *  Bitmask  1| 1| 1| 1| | 1| 1| 1|  0
 *  ----------------------------------
 *
 * Example: Every work day Mo-Fr
 *  0111 1100 = 62
 *
 * Example: Every day
 *  0111 1111 = 127
 *
 * Example: Weekends
 *  1000 0010 = 65
 */



/**
 * requirements
 */
const util = require('util')
const mysql = require('mysql')
const rv = require('./rulevalidation')


/**
 * database server default settings
 */
let HOST = 'localhost';
let PORT = 3306;
let MYSQL_USER = 'root';    //your mysql/mariadb user. Do not use root. User your own user. ;-)
let MYSQL_PASS = 'Warlock'; //your mysql/mariadb root pw. Do not use this example. Create your onw secure pw. ;-)
let DATABASE = 'lightcontrol';
let TABLE_RULES = 'lightrulesgeneral';



/**
 * global declarations
 */
let ruleValidation
let loggerCallback
let rules = []



/**
* main module object declaration
*/
module.exports = {
    /**
     * initialize datbase handler object
     * @param {*} loggerFunc    callback function of the main logger class 
     * @param {*} dbHost        database hostname (mysql default: localhost)
     * @param {*} dbPort        datapase port (mysql default: 3306)
     * @param {*} dbUser        database user
     * @param {*} dbPass        database password
     * @param {*} dbName        database name
     * @param {*} dbRulesTable  database rules table name
     */
    Init: function (loggerFunc, dbHost, dbPort, dbUser, dbPass, dbName, dbRulesTable) {
        loggerCallback = loggerFunc
        ruleValidation = rv.Init(loggerFunc)
        _initDatabaseVars(dbHost, dbPort, dbUser, dbPass, dbName, dbRulesTable)
        return this
    },

    Rules: rules,

    /**
     * reads db rules and gets the current rule if one applies now
     * @param {*} resultCallback function that will be executed when database query is done
     */
    AnalyzeRules: function (resultCallback) { _analyzeRules(resultCallback) },
}


/**********************************************************************************************************************
 * private functions
 *********************************************************************************************************************/

/**
 * initiate datbase variables
 * @param {*} dbHost 
 * @param {*} dbPort 
 * @param {*} dbUser 
 * @param {*} dbPass 
 * @param {*} dbName 
 * @param {*} dbRulesTable 
 */
function _initDatabaseVars(dbHost, dbPort, dbUser, dbPass, dbName, dbRulesTable) {
    if (dbHost) { HOST = dbHost }
    if (dbPort) { PORT = dbPort }
    if (dbUser) { MYSQL_USER = dbUser }
    if (dbPass) { MYSQL_PASS = dbPass }
    if (dbName) { DATABASE = dbName }
    if (dbRulesTable) { TABLE_RULES = dbRulesTable }
}

/**
 * reads db rules and gets the current rule if one applies now
 * @param {*} resultCallback 
 */
function _analyzeRules(resultCallback) {

    //create connection object
    let connection = mysql.createConnection({
        host: HOST,
        port: PORT,
        user: MYSQL_USER,
        password: MYSQL_PASS,
        insecureAuth: true
    }, function (e) {
        if (typeof resultCallback === 'function') {
            resultCallback(null, null, e);
        }
    });

    connection.query('use ' + DATABASE);

    toLogger(util.format('dbaccess.js: Connection successful. (connection.state: %s', connection.state))

    connection.query('SELECT * FROM ' + TABLE_RULES + ' ORDER BY Priority ASC, id ASC', function (err, results, fields) {
        let ruleFound = false;

        if (err) {
            toLogger(util.format('dbaccess.js: %o', err))
        } else {
            this.Rules = results;//TODO: not working since undefined, why?
            rules = results;//TODO: not working since undefined, why?

            for (let i in results) {
                let rule = results[i];

                if (_ruleApplies(rule)) {
                    ruleFound = true;
                    if (typeof resultCallback === "function") {
                        resultCallback(results, rule);
                        break;
                    }
                }
            }
        }

        if (!ruleFound) {
            if (typeof resultCallback === 'function') {
                resultCallback(results, null);//return null if no rule is active
            }
        }
    });

    connection.end();
}

/**
 * checks with rule-validation module if rule applies now
 */
function _ruleApplies(rule) {
    return ruleValidation.YearIsInRuleRange(rule) &&
        ruleValidation.TodayIsInRuleRange(rule) &&
        ruleValidation.TodayIsTheCorrectWeekday(rule) &&
        ruleValidation.TimeIsInRange(rule);
}

/**
 * logs everything to the logger callback function if exists
 * wrapper of the callback delegate
 * @param {*} message
 */
function toLogger(message) {
    if (typeof loggerCallback === 'function') {
        loggerCallback(message)
    }
}

