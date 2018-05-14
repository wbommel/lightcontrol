var mysql = require('mysql');

var HOST = 'localhost';
var PORT = 3306;
var MYSQL_USER = 'root';
var MYSQL_PASS = '';
var DATABASE = ' lightcontrol';
var TABLE_RULES = 'lightrulesgeneral';

var weekdays = require('./weekdays.js');

var rulevalidation = require('./rulevalidation');

//TODO: Don't create Connection only at load module load time
var connection = mysql.createConnection({
    host : HOST,
    port : PORT,
    user : MYSQL_USER,
    password : MYSQL_PASS,
    insecureAuth : true
});

connection.query('use ' + DATABASE);

var rules;

module.exports = {
    Rules: rules,
    GetAplyingRule: function (resultCallback) {
        connection.query('SELECT * FROM ' + TABLE_RULES + ' ORDER BY Priority ASC, id ASC', function (err, results, fields) {
            var ruleFound = false;

            if (err) {
                console.log(err);
            } else {
                this.Rules = results;//TODO: not working since undefined, why?
                rules = results;//TODO: not working since undefined, why?

                for (var i in results) {
                    var rule = results[i];

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
    }
}

function _ruleApplies(rule) {
    return rulevalidation.YearIsInRuleRange(rule) &&
        rulevalidation.TodayIsInRuleRange(rule) &&
        rulevalidation.TodayIsTheCorrectWeekday(rule) &&
        rulevalidation.TimeIsInRange(rule);
}




/*
 From / To format:
 12345678901234567890
 YYYY;MM;DD;hh;mm
 Example: Every day (depending on Weekdays field) from 08:00 to 11:00
 From: 0000;01;01;08;00
 To  : 9999;12;31;11;00

 Weekdays format:
   S|F|T|W | T|M|S
   a|r|h|e | u|o|u
 -----------------
 0|1|1|1 | 1|1|1|1

 Example: Every work day Mo-Fr
 62  = 0011 1110

 Example: Every day
 127 = 0111 1111

 Example: Weekends
 65  = 0010 0001
 */



/**
 * Old testing stuff. maybe there is still something useful in there.
 */
// connection.query('SELECT * FROM ' + TABLE_RULES + ' ORDER BY Priority ASC', function (err, results, fields) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('Getting Rules:');
//
//         rules = results;
//
//         for (var i in results) {
//             var rule = results[i];
//             var dateFrom = new Date();
//             console.log('Object        : %o', rule);
//             console.log('Priority      : %d', rule.Priority);
//             console.log('From          : %s', rule.From);
//             var from = rule.From.split(';');
//             console.log('   from.Year  : %s', from[0]);
//             console.log('   from.Month : %s', from[1]);
//             console.log('   from.Day   : %s', from[2]);
//             console.log('   from.Hour  : %s', from[3]);
//             console.log('   from.Minute: %s', from[4]);
//             console.log('To            : %s', rule.To);
//             var to = rule.To.split(';');
//             console.log('   to.Year    : %s', to[0]);
//             console.log('   to.Month   : %s', to[1]);
//             console.log('   to.Day     : %s', to[2]);
//             console.log('   to.Hour    : %s', to[3]);
//             console.log('   to.Minute  : %s', to[4]);
//             console.log('DimTime       : %d', rule.DimTime);
//             console.log('Weekdays      : %d', rule.Weekdays);
//             console.log('   Monday     : %s', weekdays.HasMonday(rule.Weekdays) ? 'X' : '');
//             console.log('   Tuesday    : %s', weekdays.HasTuesday(rule.Weekdays) ? 'X' : '');
//             console.log('   Wednesday  : %s', weekdays.HasWednesday(rule.Weekdays) ? 'X' : '');
//             console.log('   Thursday   : %s', weekdays.HasThursday(rule.Weekdays) ? 'X' : '');
//             console.log('   Friday     : %s', weekdays.HasFriday(rule.Weekdays) ? 'X' : '');
//             console.log('   Saturday   : %s', weekdays.HasSaturday(rule.Weekdays) ? 'X' : '');
//             console.log('   Sunday     : %s', weekdays.HasSunday(rule.Weekdays) ? 'X' : '');
//             console.log('------------------------------------------------------------');
//         }
//
//         /* check how many rules apply */
//         var count = 0;
//
//         for (var idx in rules) {
//             var rule = rules[idx];
//             console.log('');
//             console.log('current rule.id: %d', rule.id);
//
//             if (rulevalidation.YearIsInRuleRange(rule)) {
//                 console.log('   - year is in rule');
//                 if (rulevalidation.TodayIsInRuleRange(rule)) {
//                     console.log('   - today is in rule');
//                     if (rulevalidation.TodayIsTheCorrectWeekday(rule)) {
//                         console.log('   - weekday is in rule also');
//                         if (rulevalidation.TimeIsInRange(rule)) {
//                             console.log('   - time is in rule also');
//                             count++;
//                         }
//                     }
//                 }
//             }
//         }
//         console.log('');
//         console.log('= count of applying rules for now: %d', count);
//         console.log('');
//         console.log('');
//
//
//         for (var idx in rules) {
//             var rule = rules[idx];
//             console.log('current rule.id: %d    rule applies now: %s', rule.id, RuleApplies(rule));
//         }
//         console.log('');
//
//
//         /*
//                 console.log('Nothing  : ' + weekdays.WeekdaysToInt(false, false, false, false, false, false, false));
//                 console.log('Monday   : ' + weekdays.WeekdaysToInt(true, false, false, false, false, false, false));
//                 console.log('Tuesday  : ' + weekdays.WeekdaysToInt(false, true, false, false, false, false, false));
//                 console.log('Wednesday: ' + weekdays.WeekdaysToInt(false, false, true, false, false, false, false));
//                 console.log('Thursday : ' + weekdays.WeekdaysToInt(false, false, false, true, false, false, false));
//                 console.log('Friday   : ' + weekdays.WeekdaysToInt(false, false, false, false, true, false, false));
//                 console.log('Saturday : ' + weekdays.WeekdaysToInt(false, false, false, false, false, true, false));
//                 console.log('Sunday   : ' + weekdays.WeekdaysToInt(false, false, false, false, false, false, true));
//                 console.log('');
//         */
//         /*
//                 var rule = {id: 1, Priority: 9999, From: '', To: '', DimTime: 30, Weekdays: 127};
//                 rule.From = "0000;01;01;00;00";
//                 rule.To = "0000;12;31;23;59";
//
//                 console.log('TodayIsinRange: ' + rulevalidation.TodayIsInRuleRange(rule));
//                 console.log('');
//         */
//         /*
//                 var Sunday = Math.pow(2, 0);
//                 var Monday = Math.pow(2, 1);
//                 var Tuesday = Math.pow(2, 2);
//                 var Wednesday = Math.pow(2, 3);
//                 var Thursday = Math.pow(2, 4);
//                 var Friday = Math.pow(2, 5);
//                 var Saturday = Math.pow(2, 6);
//                 var expected = false;
//                 for (var idx = 0; idx <= 127; idx++) {
//                     expected = ((idx & Tuesday) === Tuesday);
//                     console.log('#HasTuesday(%d) should return %s', idx, expected);
//                     console.log('result: %s', weekdays.HasTuesday(idx));
//                 }
//                 console.log('');
//         */
//         /*
//                 var values = [];
//                 console.log('Array length: %d', values.length);
//                 for (var i = 0; i <= 127; i++) {
//                     values.push(i);
//                 }
//                 console.log('Array length: %d', values.length);
//                 for (var value in values) {
//                     console.log('value: %d', value);
//                 }
//                 console.log('');
//         */
//         /*
//                 var Sunday = Math.pow(2, 0);
//                 var Monday = Math.pow(2, 1);
//                 var Tuesday = Math.pow(2, 2);
//                 var Wednesday = Math.pow(2, 3);
//                 var Thursday = Math.pow(2, 4);
//                 var Friday = Math.pow(2, 5);
//                 var Saturday = Math.pow(2, 6);
//
//                 var expected = false;
//                 var resultMo = false;
//                 var resultTu = false;
//                 var resultWe = false;
//                 var resultTh = false;
//                 var resultFr = false;
//                 var resultSa = false;
//                 var resultSu = false;
//
//                 for (var idx = 0; idx <= 127; idx++) {
//                     expected = ((idx & Monday) == Monday);
//                     resultMo = weekdays.HasMonday(idx);
//                     resultTu = weekdays.HasTuesday(idx);
//                     resultWe = weekdays.HasWednesday(idx);
//                     resultTh = weekdays.HasThursday(idx);
//                     resultFr = weekdays.HasFriday(idx);
//                     resultSa = weekdays.HasSaturday(idx);
//                     resultSu = weekdays.HasSunday(idx);
//                     // console.log('%d & %d == %d', idx, Monday, (idx & Monday));
//                     // console.log('expected          : %s', expected);
//                     console.log('Mo, Tu, We, Th, Fr, Sa, Su: %s, %s, %s, %s, %s, %s, %s', resultMo, resultTu, resultWe, resultTh, resultFr, resultSa, resultSu);
//                 }
//                 console.log('');
//         */
//     }
// });


// var datetest = new Date();
// console.log('datetest before: %s', datetest.toTimeString());
// datetest.setMinutes(datetest.getMinutes() + 123);
// console.log('datetest after : %s', datetest.toTimeString());
// console.log('Unix time      : %s', datetest);
// console.log('Unix time      : %d', datetest);
// var timetest=Date.now();
// console.log(timetest);


// var connection = mysql.createConnection({
//     host: HOST,
//     port: PORT,
//     user: MYSQL_USER,
//     password: MYSQL_PASS
// });

//connection.query('use ' + DATABASE);
