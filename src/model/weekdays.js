/**
 * Created by Bommel2 on 02.04.2018.
 */

/*
*  the list of weekdays is bound to javascript's Date().getDay() functionality where
*  sunday is 0, monday is 1, tuesday is 2 and so on until saturday which is 6
*
*  this makes it easier to develop time related functions without having to convert
*  the weekdays back and forth.
* */
var Sunday = Math.pow(2, 0);
var Monday = Math.pow(2, 1);
var Tuesday = Math.pow(2, 2);
var Wednesday = Math.pow(2, 3);
var Thursday = Math.pow(2, 4);
var Friday = Math.pow(2, 5);
var Saturday = Math.pow(2, 6);



module.exports.WeekdaysToInt = function (Mo, Tu, We, Th, Fr, Sa, Su) {
    return (Mo ? Monday : 0) + (Tu ? Tuesday : 0) + (We ? Wednesday : 0) + (Th ? Thursday : 0) + (Fr ? Friday : 0) + (Sa ? Saturday : 0) + (Su ? Sunday : 0);
}


module.exports.HasSunday = function (WeekdayInteger) {
    return (WeekdayInteger & Sunday) == Math.pow(2, 0);
}

module.exports.HasMonday = function (WeekdayInteger) {
    return (WeekdayInteger & Monday) === Math.pow(2, 1);
}

module.exports.HasTuesday = function (WeekdayInteger) {
    return (WeekdayInteger & Tuesday) == Math.pow(2, 2);
}

module.exports.HasWednesday = function (WeekdayInteger) {
    return (WeekdayInteger & Wednesday) == Math.pow(2, 3);
}

module.exports.HasThursday = function (WeekdayInteger) {
    return (WeekdayInteger & Thursday) == Math.pow(2, 4);
}

module.exports.HasFriday = function (WeekdayInteger) {
    return (WeekdayInteger & Friday) == Math.pow(2, 5);
}

module.exports.HasSaturday = function (WeekdayInteger) {
    return (WeekdayInteger & Saturday) == Math.pow(2, 6);
}
