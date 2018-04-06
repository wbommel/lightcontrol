var mysql = require('mysql');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = ' lightcontrol';
var TABLE_RULES = 'lightrulesgeneral';

/*
 From / To format:
 12345678901234567890
 YYYY;MM;DD;hh;mm
 Example: Every day (depending on Weekdays field) from 08:00 to 11:00
 From: 0000;01;01;08;00
 To  : 9999;12;31;11;00

 Weekdays format:
 |S|S|F | T|W|T|M
 |u|a|r | h|e|u|o
 ---------------
 0|1|1|1 | 1|1|1|1
 Example: Every work day Mo-Fr
 31  = 0001 1111
 Example: Every day
 127 = 0111 1111
 Example: Weekends
 96  = 0110 0000
 */
 var helpers = require('./weekdays.js');
// var padStart = require('string.prototype.padstart');

var rulevalidation=require('./rulevalidation');

var connection = mysql.createConnection({
    host: HOST,
    port: PORT,
    user: MYSQL_USER,
    password: MYSQL_PASS
});

connection.query('use ' + DATABASE);


var rules;

connection.query('SELECT * FROM ' + TABLE_RULES, function (err, results, fields) {
    if (err) {
        console.log(err);
    } else {
        console.log('Getting Rules:');

        rules = results;

        for (var i in results) {
            var rule = results[i];
            var dateFrom = new Date();
            console.log('Object        : %o', rule);
            console.log('Priority      : %d', rule.Priority);
            console.log('From          : %s', rule.From);
            var from = rule.From.split(';');
            console.log('   from.Year  : %s', from[0]);
            console.log('   from.Month : %s', from[1]);
            console.log('   from.Day   : %s', from[2]);
            console.log('   from.Hour  : %s', from[3]);
            console.log('   from.Minute: %s', from[4]);
            console.log('To            : %s', rule.To);
            var to = rule.To.split(';');
            console.log('   to.Year    : %s', to[0]);
            console.log('   to.Month   : %s', to[1]);
            console.log('   to.Day     : %s', to[2]);
            console.log('   to.Hour    : %s', to[3]);
            console.log('   to.Minute  : %s', to[4]);
            console.log('DimTime       : %d', rule.DimTime);
            console.log('Weekdays      : %d', rule.Weekdays);
            console.log('   Monday     : %s', helpers.HasMonday(rule.Weekdays) ? 'X' : '');
            console.log('   Tuesday    : %s', helpers.HasTuesday(rule.Weekdays) ? 'X' : '');
            console.log('   Wednesday  : %s', helpers.HasWednesday(rule.Weekdays) ? 'X' : '');
            console.log('   Thursday   : %s', helpers.HasThursday(rule.Weekdays) ? 'X' : '');
            console.log('   Friday     : %s', helpers.HasFriday(rule.Weekdays) ? 'X' : '');
            console.log('   Saturday   : %s', helpers.HasSaturday(rule.Weekdays) ? 'X' : '');
            console.log('   Sunday     : %s', helpers.HasSunday(rule.Weekdays) ? 'X' : '');
            console.log('------------------------------------------------------------');
        }

        /* check how many rules apply */
        var count = 0;

        for (var idx in rules) {
            var rule = rules[idx];

            if (rulevalidation.TodayIsInRuleRange(rule)) {
                console.log('today is in rule');
                if (rulevalidation.TodayIsTheCorrectWeekday(rule)) {
                    console.log('weekday is in rule also');
                    count++;
                }
            }
        }
        console.log('Count: %d', count);
    }
});
