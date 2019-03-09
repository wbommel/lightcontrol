/**
 *
 *
 *
 *
 *
 *
 */



/**
 * requirements
 */
const mysql = require('mysql')
const logger = require('../logger.js') // test own logger class (only reference it here since the detail settings are done in main server.js)
const rulevalidation = require('./rulevalidation')
const conf = require('../config.json')


/**
 * database server settings
 */
const HOST = 'localhost';
const PORT = 3306;
const MYSQL_USER = 'root';    //your mysql/mariadb user. Do not use root. User your own user. ;-)
const MYSQL_PASS = 'Warlock'; //your mysql/mariadb root pw. Do not use this example. Create your onw secure pw. ;-)
const DATABASE = ' lightcontrol';
const TABLE_RULES = 'lightrulesgeneral';



/**
 * global declarations
 */
let rules;

module.exports = {
    Rules: rules,
    GetAplyingRule: function (resultCallback) {
      //_readRulesfromDB(resultCallback)
      _readRulesFromConfig(resultCallback)
    }
};



function _readRulesfromDB(resultCallback){

          //create connection object
          let connection = mysql.createConnection({
              host: HOST,
              port: PORT,
              user: MYSQL_USER,
              password: MYSQL_PASS,
              insecureAuth: true
          }, function (e) {
              resultCallback(null, null, e);
          });

          connection.query('use ' + DATABASE);

          logger.LogIt('dbaccess.js: Connection successful. (connection.state: ' + connection.state + ')');
          //console.log('dbaccess.js: Connection successful. (connection.state: ' + connection.state + ')');

          connection.query('SELECT * FROM ' + TABLE_RULES + ' ORDER BY Priority ASC, id ASC', function (err, results, fields) {
              let ruleFound = false;

              if (err) {
                  logger.ToConsole(err);
                  //console.log(err);
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
                  resultCallback(results, null);//return null if no rule is active
              }
          });

          connection.end();
}



function _readRulesFromConfig(resultCallback){
      if (typeof resultCallback !== "function") { return }

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
          resultCallback(rules, null);//return null if no rule is active
      }
}



function _ruleApplies(rule) {
    return rulevalidation.YearIsInRuleRange(rule) &&
        rulevalidation.TodayIsInRuleRange(rule) &&
        rulevalidation.TodayIsTheCorrectWeekday(rule) &&
        rulevalidation.TimeIsInRange(rule);
}




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
