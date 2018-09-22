/**
 * Created by Bommel2 on 04.04.2018.
 */
const weekdays = require('./weekdays.js');
const padStart = require('string.prototype.padstart');



let loggerCallback



/**
 * declare a descent "interface"
 */
module.exports = {
    Init: function (loggerFunc) {
        loggerCallback = loggerFunc
        return this
    },

    /**
     * returns true if the current time is in range of the rule
     * @param rule
     * @returns {boolean}
     * @constructor
     */
    TimeIsInRange: function (rule) { return _timeIsInRange(rule) },

    /**
     * returns true if today is one of the valid weekdays in rule
     * @param rule
     * @returns {boolean}
     * @private
     */
    TodayIsTheCorrectWeekday: function (rule) { return _todayIsTheCorrectWeekday(rule) },

    /**
     * returns true if the given rule applies to today (the whole day)
     *
     * @param rule
     * @returns {boolean}
     * @private
     *
     * TODO: think about caching this result
     */
    TodayIsInRuleRange: function (rule) { return _todayIsInRuleRange(rule) },

    /**
     *
     * @param rule
     * @returns {boolean}
     * @constructor
     */
    YearIsInRuleRange: function (rule) { return _yearIsInRuleRange(rule) }
};



/**********************************************************************************************************************
 * private functions
 *********************************************************************************************************************/
function _timeIsInRange(rule) {
    //TODO: check if rule is valid
    let now = new Date(new Date().toLocaleString());

    //prepare from time
    let from = new Date(new Date().toLocaleString());
    from.setHours(parseInt(rule.From.split(';')[3]));
    from.setMinutes(parseInt(rule.From.split(';')[4]));
    from.setSeconds(0);
    from.setMilliseconds(0);

    //prepare to time
    let to = new Date(new Date().toLocaleString());
    to.setHours(parseInt(rule.To.split(';')[3]));
    to.setMinutes(parseInt(rule.To.split(';')[4]) + rule.DimTime); //take DimTime into account
    to.setSeconds(0);
    to.setMilliseconds(0);

    let retVal = now >= from && now <= to;
    toLogger('ruleValidation._timeIsInRange: ' + retVal)
    return retVal ? true : false;
}

function _todayIsTheCorrectWeekday(rule) {
    //TODO: check if rule is valid
    let now = new Date(new Date().toLocaleString());

    let retVal = (now.getDay() === weekdays.DaySunday && weekdays.HasSunday(rule.Weekdays)) ||
        (now.getDay() === weekdays.DayMonday && weekdays.HasMonday(rule.Weekdays)) ||
        (now.getDay() === weekdays.DayTuesday && weekdays.HasTuesday(rule.Weekdays)) ||
        (now.getDay() === weekdays.DayWednesday && weekdays.HasWednesday(rule.Weekdays)) ||
        (now.getDay() === weekdays.DayThursday && weekdays.HasThursday(rule.Weekdays)) ||
        (now.getDay() === weekdays.DayFriday && weekdays.HasFriday(rule.Weekdays)) ||
        (now.getDay() === weekdays.DaySaturday && weekdays.HasSaturday(rule.Weekdays));

    toLogger('ruleValidation._todayIsTheCorrectWeekday: ' + retVal)
    return retVal ? true : false;
}


function _todayIsInRuleRange(rule) {
    //TODO: check if rule is valid
    let now = new Date(new Date().toLocaleString());
    let concatnowstr = padStart(now.getMonth() + 1, 2, '0') + padStart(now.getDate(), 2, '0');
    let arr = rule.From.split(';');
    let from = arr[1] + arr[2];
    arr = rule.To.split(';');
    let to = arr[1] + arr[2];

    let retVal = parseInt(concatnowstr) >= parseInt(from) && parseInt(concatnowstr) <= parseInt(to);
    toLogger('ruleValidation._todayIsInRuleRange: ' + retVal)
    return retVal ? true : false;
}


function _yearIsInRuleRange(rule) {
    let now = new Date(new Date().toLocaleString());

    let arr = rule.From.split(';');
    let from = arr[0];
    arr = rule.To.split(';');
    let to = arr[0];

    let retVal = now.getFullYear() >= parseInt(from) && now.getFullYear() <= parseInt(to);
    toLogger('ruleValidation._yearIsInRuleRange: ' + retVal)
    return retVal ? true : false;
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
