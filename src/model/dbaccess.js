/**
 * Database format descriptions
 *
 * From / To format:
 *  12345678901234567890
 *  YYYY;MM;DD;hh;mm
 *
 * Example: Every date from 01.01.0000 to 31.12.9999
 *          Every week day from 08:00 to 11:00
 *  From    : "0000;01;01;08;00"
 *  To      : "9999;12;31;11;00"
 *  Weekdays: 127 (see below)
 *
 * Example: Every date from 01.01.0000 to 31.12.9999
 *          Saturdays and Sundays from 09:00 to 11:00
 *  From    : "0000;01;01;09;00"
 *  To      : "9999;12;31;11;00"
 *  Weekdays: 65 (see below)
 *
 * Weekdays format:
 *  ---------------------------------
 *  Weekday --|Sa|Fr|Th| |We|Tu|Mo|Su
 *  ---------------------------------
 *  Value  128|64|32|16| | 8| 4| 2| 1
 *  =================================
 *  Bitmask  0| 1| 1| 1| | 1| 1| 1| 1
 *  ---------------------------------
 *
 * Example: Every work day Mo-Fr
 *  0011 1110 = 62
 *
 * Example: Every day
 *  0111 1111 = 127
 *
 * Example: Weekends
 *  0100 0001 = 65
 */


/**
 * requirements
 */
//testing dependency injection
//const util = require('util')
//const rv = require('./rulevalidation')
//const mysql = require('mysql')
let util
let rv
let mysql



/**
 * database server default settings
 */
let HOST = 'localhost';
let PORT = 3306;
let MYSQL_USER = 'root'; //your mysql/mariadb user. Do not use root. User your own user. ;-)
let MYSQL_PASS = 'Warlock'; //your mysql/mariadb root pw. Do not use this example. Create your onw secure pw. ;-)
let DATABASE = 'lightcontrol';
let TABLE_RULES = 'lightrulesgeneral';



/**
 * global declarations
 */
let ruleValidation
let logger
let rules = []
let isInitialized = false




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
    Init: function (diContainer) {
        //handle dependency injection objects
        util = diContainer.util
        rv = diContainer.rv
        mysql = diContainer.mysql
        logger = diContainer.logger
        conf = diContainer.conf

        isInitialized = util !== undefined && rv !== undefined && mysql !== undefined && logger !== undefined && conf !== undefined

        //initialization
        _initDatabaseVars(conf.host, conf.port, conf.username, '', conf.dbname, conf.rulestable)

        //end factory pattern correctly
        return this;
    },

    Rules: rules,

    /**
     * reads db rules and gets the current rule if one applies now
     * @param {*} resultCallback function that will be executed when database query is done
     */
    AnalyzeRules: function (resultCallback) {
        //_analyzeRulesFromDB(resultCallback)
        _analyzeRulesFromConfig(resultCallback)
    }
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
    if (dbHost) {
        HOST = dbHost
    }
    if (dbPort) {
        PORT = dbPort
    }
    if (dbUser) {
        MYSQL_USER = dbUser
    }
    if (dbPass) {
        MYSQL_PASS = dbPass
    }
    if (dbName) {
        DATABASE = dbName
    }
    if (dbRulesTable) {
        TABLE_RULES = dbRulesTable
    }
}

/**
 * reads db rules and gets the current rule if one applies now
 * @param {*} resultCallback 
 */
function _analyzeRulesFromDB(resultCallback) {
    if (!isInitialized) {
        throw NotInitializedException(this)
    }

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

    toLogger(util.format('dbaccess.js: Connection successful. (connection.state: %s', connection.state), logger.LogLevelInformation)

    connection.query('SELECT * FROM ' + TABLE_RULES + ' ORDER BY Priority ASC, id ASC', function (err, results, fields) {
        let ruleFound = false;

        if (err) {
            toLogger(util.format('dbaccess.js: %o', err), logger.LogLevelError)
        } else {
            this.Rules = results; //TODO: not working since undefined, why?
            rules = results; //TODO: not working since undefined, why?

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
                resultCallback(results, null); //return null if no rule is active
            }
        }
    });

    connection.end();
}

/**
 * reads rules from config
 * @param {*} resultCallback 
 */
function _analyzeRulesFromConfig(resultCallback) {
    if (typeof resultCallback !== "function") {
        return
    }

    if (!conf.rules) {
        resultCallback(null, null, "ERROR no rules...")
        return
    }

    let ruleFound = false
    this.Rules = conf.rules
    rules = conf.rules

    for (let i in rules) {
        let rule = rules[i]

        if (_ruleApplies(rule)) {
            ruleFound = true;
            resultCallback(rules, rule);
            break;
        }
    }

    if (!ruleFound) {
        resultCallback(rules, null); //return null if no rule is active
    }
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
 * @param {*} level 
 */
function toLogger(message, level) {
    if (logger) {
        logger.LogIt(message, level)
    }
}