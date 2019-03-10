/**
 * Created by Bommel2 on 04.04.2018.
 */
const weekdays = require('./weekdays.js');
const padStart = require('string.prototype.padstart');


module.exports = {
    /**
     *
     * @param rule
     * @returns {boolean}
     * @constructor
     */
    TimeIsInRange: function (rule) {
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

        return now >= from && now <= to;
    },


    /**
     * returns true if today is one of the valid weekdays in rule
     * @param rule
     * @returns {boolean}
     * @private
     */
    TodayIsTheCorrectWeekday: function (rule) {
        //TODO: check if rule is valid
        let now = new Date(new Date().toLocaleString());

        return (now.getDay() === weekdays.DaySunday && weekdays.HasSunday(rule.Weekdays)) ||
            (now.getDay() === weekdays.DayMonday && weekdays.HasMonday(rule.Weekdays)) ||
            (now.getDay() === weekdays.DayTuesday && weekdays.HasTuesday(rule.Weekdays)) ||
            (now.getDay() === weekdays.DayWednesday && weekdays.HasWednesday(rule.Weekdays)) ||
            (now.getDay() === weekdays.DayThursday && weekdays.HasThursday(rule.Weekdays)) ||
            (now.getDay() === weekdays.DayFriday && weekdays.HasFriday(rule.Weekdays)) ||
            (now.getDay() === weekdays.DaySaturday && weekdays.HasSaturday(rule.Weekdays));
    },


    /**
     * returns true if the given rule applies to today (the whole day)
     *
     * @param rule
     * @returns {boolean}
     * @private
     *
     * TODO: think about caching this result
     */
    TodayIsInRuleRange: function (rule) {
        //TODO: check if rule is valid
        let now = new Date(new Date().toLocaleString());
        let concatnowstr = padStart(now.getMonth() + 1, 2, '0') + padStart(now.getDate(), 2, '0');
        let arr = rule.From.split(';');
        let from = arr[1] + arr[2];
        arr = rule.To.split(';');
        let to = arr[1] + arr[2];

        return parseInt(concatnowstr) >= parseInt(from) && parseInt(concatnowstr) <= parseInt(to);
    },


    /**
     *
     * @param rule
     * @returns {boolean}
     * @constructor
     */
    YearIsInRuleRange: function (rule) {
        let now = new Date(new Date().toLocaleString());

        let arr = rule.From.split(';');
        let from = arr[0];
        arr = rule.To.split(';');
        let to = arr[0];

        return now.getFullYear() >= parseInt(from) && now.getFullYear() <= parseInt(to);
    }

};
