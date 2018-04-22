/**
 * Created by Bommel2 on 04.04.2018.
 */
var weekdays = require('./weekdays.js');
var padStart = require('string.prototype.padstart');


/**
 *
 * @param rule
 * @returns {boolean}
 * @constructor
 */
module.exports.TimeIsInRange = function (rule) {
    //TODO: check if rule is valid
    var now = new Date(new Date().toLocaleString());

    //prepare from time
    var from = new Date(new Date().toLocaleString());
    from.setHours(parseInt(rule.From.split(';')[3]));
    from.setMinutes(parseInt(rule.From.split(';')[4]));
    from.setSeconds(0);
    from.setMilliseconds(0);

    //prepare to time
    var to = new Date(new Date().toLocaleString());
    to.setHours(parseInt(rule.To.split(';')[3]));
    to.setMinutes(parseInt(rule.To.split(';')[4]) + rule.DimTime); //take DimTime into account
    to.setSeconds(0);
    to.setMilliseconds(0);

    return now >= from && now <= to;

    /* old behaviour:
    var nowtimeint = parseInt(padStart(now.getHours(), 2, '0') +
        padStart(now.getMinutes(), 2, '0'));
    var rulefromint = parseInt(padStart(rule.From.split(';')[3], 2, '0') +
        padStart(rule.From.split(';')[4], 2, '0'));
    var ruletoint = parseInt(padStart(rule.To.split(';')[3], 2, '0') +
        padStart(rule.To.split(';')[4], 2, '0'));

    return nowtimeint >= rulefromint && nowtimeint <= ruletoint;
    */
}


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
}


/**
 * returns true if the given rule applies to today (the whole day)
 *
 * @param rule
 * @returns {boolean}
 * @private
 *
 * TODO: think about caching this result
 */
module.exports.TodayIsInRuleRange = function (rule) {
    //TODO: check if rule is valid
    var now = new Date(new Date().toLocaleString());
    var concatnowstr = padStart(now.getMonth() + 1, 2, '0') + padStart(now.getDate(), 2, '0');
    var arr = rule.From.split(';');
    var from = arr[1] + arr[2];
    arr = rule.To.split(';');
    var to = arr[1] + arr[2];

    return parseInt(concatnowstr) >= parseInt(from) && parseInt(concatnowstr) <= parseInt(to);
}


/**
 *
 * @param rule
 * @returns {boolean}
 * @constructor
 */
module.exports.YearIsInRuleRange = function (rule) {
    var now = new Date(new Date().toLocaleString());

    var arr = rule.From.split(';');
    var from = arr[0];
    arr = rule.To.split(';');
    var to = arr[0];

    return now.getFullYear() >= parseInt(from) && now.getFullYear() <= parseInt(to);
}