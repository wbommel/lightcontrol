/**
 * Created by Bommel2 on 04.04.2018.
 */
var weekdays = require('./weekdays.js');
var padStart = require('string.prototype.padstart');



module.exports.TimeIsInRange = function (rule) {
    //TODO: check if rule is valid
    var now = new Date(new Date().toLocaleString());

    var nowtimeint = parseInt(padStart(now.getHours(), 2, '0') +
        padStart(now.getMinutes(), 2, '0'));
    var rulefromint = parseInt(padStart(rule.From.split(';')[3], 2, '0') +
        padStart(rule.From.split(';')[4], 2, '0'));
    var ruletoint = parseInt(padStart(rule.To.split(';')[3], 2, '0') +
        padStart(rule.To.split(';')[4], 2, '0'));

    return nowtimeint >= rulefromint && nowtimeint <= ruletoint;
};



/**
 * returns true if today is one of the valid weekdays in rule
 * @param rule
 * @returns {boolean}
 * @private
 */
module.exports.TodayIsTheCorrectWeekday = function (rule) {
    //TODO: check if rule is valid
    var now = new Date(new Date().toLocaleString());

    return (now.getDay() === 0 && weekdays.HasMonday(rule.Weekdays)) ||
        (now.getDay() === 1 && weekdays.HasTuesday(rule.Weekdays)) ||
        (now.getDay() === 2 && weekdays.HasWednesday(rule.Weekdays)) ||
        (now.getDay() === 3 && weekdays.HasThursday(rule.Weekdays)) ||
        (now.getDay() === 4 && weekdays.HasFriday(rule.Weekdays)) ||
        (now.getDay() === 5 && weekdays.HasSaturday(rule.Weekdays)) ||
        (now.getDay() === 6 && weekdays.HasSunday(rule.Weekdays));
};



/**
 * returns true if the given rule applies to today (the whole day)
 * @param rule
 * @returns {boolean}
 * @private
 *
 * TODO: think about caching this result
 */
module.exports.TodayIsInRuleRange = function (rule) {
    //TODO: check if rule is valid
    var now = new Date(new Date().toLocaleString());
    var concatnowstr = padStart(now.getFullYear().toString(), 4, '0') +
        padStart(now.getMonth().toString(), 2, '0') +
        padStart(now.getDate().toString(), 2, '0') +
        padStart(now.getHours().toString(), 2, '0') +
        padStart(now.getMinutes().toString(), 2, '0');
    var from = rule.From.replace(/;/g, '');
    var to = rule.To.replace(/;/g, '');

    return parseInt(concatnowstr) >= parseInt(from) && parseInt(concatnowstr) <= parseInt(to);
};