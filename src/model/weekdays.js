/**
 * Created by Bommel2 on 02.04.2018.
 */




module.exports = {
    /*
    *  the list of weekdays is bound to javascript's Date().getDay() functionality where
    *  sunday is 0, monday is 1, tuesday is 2 and so on until saturday which is 6
    *
    *  this makes it easier to develop time related functions without having to convert
    *  the weekdays back and forth.
    * */
    DaySunday: 0,
    DayMonday: 1,
    DayTuesday: 2,
    DayWednesday: 3,
    DayThursday: 4,
    DayFriday: 5,
    DaySaturday: 6,

    Sunday: Math.pow(2, 0),
    Monday: Math.pow(2, 1),
    Tuesday: Math.pow(2, 2),
    Wednesday: Math.pow(2, 3),
    Thursday: Math.pow(2, 4),
    Friday: Math.pow(2, 5),
    Saturday: Math.pow(2, 6),

    /**
     *
     * @param Mo
     * @param Tu
     * @param We
     * @param Th
     * @param Fr
     * @param Sa
     * @param Su
     * @returns {number}
     * @constructor
     */
    WeekdaysToInt: function (Mo, Tu, We, Th, Fr, Sa, Su) { return (Mo ? this.Monday : 0) + (Tu ? this.Tuesday : 0) + (We ? this.Wednesday : 0) + (Th ? this.Thursday : 0) + (Fr ? this.Friday : 0) + (Sa ? this.Saturday : 0) + (Su ? this.Sunday : 0); },

    /**
     *
     * @param WeekdayInteger
     * @returns {boolean}
     * @constructor
     */
    HasSunday: function (WeekdayInteger) { return (WeekdayInteger & this.Sunday) === Math.pow(2, 0); },

    /**
     *
     * @param WeekdayInteger
     * @returns {boolean}
     * @constructor
     */
    HasMonday: function (WeekdayInteger) { return (WeekdayInteger & this.Monday) === Math.pow(2, 1); },

    /**
     *
     * @param WeekdayInteger
     * @returns {boolean}
     * @constructor
     */
    HasTuesday: function (WeekdayInteger) { return (WeekdayInteger & this.Tuesday) === Math.pow(2, 2); },

    /**
     *
     * @param WeekdayInteger
     * @returns {boolean}
     * @constructor
     */
    HasWednesday: function (WeekdayInteger) { return (WeekdayInteger & this.Wednesday) === Math.pow(2, 3); },

    /**
     *
     * @param WeekdayInteger
     * @returns {boolean}
     * @constructor
     */
    HasThursday: function (WeekdayInteger) { return (WeekdayInteger & this.Thursday) === Math.pow(2, 4); },

    /**
     *
     * @param WeekdayInteger
     * @returns {boolean}
     * @constructor
     */
    HasFriday: function (WeekdayInteger) { return (WeekdayInteger & this.Friday) === Math.pow(2, 5); },

    /**
     *
     * @param WeekdayInteger
     * @returns {boolean}
     * @constructor
     */
    HasSaturday: function (WeekdayInteger) { return (WeekdayInteger & this.Saturday) === Math.pow(2, 6); }
};