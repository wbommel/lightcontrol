/**
 * Created by Bommel2 on 02.04.2018.
 */

var Monday = 1;
var Tuesday = 2;
var Wednesday = 4;
var Thursday = 8;
var Friday = 16;
var Saturday = 32;
var Sunday = 64;


module.exports.WeekdaysToInt = function (Mo, Tu, We, Th, Fr, Sa, Su) {
    return (Mo ? Monday : 0) + (Tu ? Tuesday : 0) + (We ? Wednesday : 0) + (Th ? Thursday : 0) + (Fr ? Friday : 0) + (Sa ? Saturday : 0) + (Su ? Sunday : 0);
}

module.exports.HasMonday = function (WeekdayInteger) {
    return (WeekdayInteger & Monday) == 1;
}

module.exports.HasTuesday = function (WeekdayInteger) {
    return (WeekdayInteger & Tuesday) == 2;
}

module.exports.HasWednesday = function (WeekdayInteger) {
    return (WeekdayInteger & Wednesday) == 4;
}

module.exports.HasThursday = function (WeekdayInteger) {
    return (WeekdayInteger & Thursday) == 8;
}

module.exports.HasFriday = function (WeekdayInteger) {
    return (WeekdayInteger & Friday) == 16;
}

module.exports.HasSaturday = function (WeekdayInteger) {
    return (WeekdayInteger & Saturday) == 32;
}

module.exports.HasSunday = function (WeekdayInteger) {
    return (WeekdayInteger & Sunday) == 64;
}