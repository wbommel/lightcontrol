/**
 * Created by Bommel on 03.04.2018.
 */
//var describe = require("mocha");
var assert = require('assert');
var weekdays = require('../model/weekdays');
var rulevalidation = require('../model/rulevalidation');
var padStart = require('string.prototype.padstart');
var expect = require("chai").expect;


/**
 *  Testing of model classes
 *
 *
 */
describe('model', function () {
    //declare model-wide vars
    var Sunday = Math.pow(2, 0);
    var Monday = Math.pow(2, 1);
    var Tuesday = Math.pow(2, 2);
    var Wednesday = Math.pow(2, 3);
    var Thursday = Math.pow(2, 4);
    var Friday = Math.pow(2, 5);
    var Saturday = Math.pow(2, 6);

    var expected = false;

    describe('weekdays.js', function () {

        describe('#WeekdaysToInt()', function () {
            var Mo = false, Tu = false, We = false, Th = false, Fr = false, Sa = false, Su = false, expect = 0;

            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });
            Mo = true;
            expect = Monday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Tu = true;
            expect = Monday + Tuesday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            We = true;
            expect = Monday + Tuesday + Wednesday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Th = true;
            expect = Monday + Tuesday + Wednesday + Thursday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Fr = true;
            expect = Monday + Tuesday + Wednesday + Thursday + Friday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Sa = true;
            expect = Monday + Tuesday + Wednesday + Thursday + Friday + Saturday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Su = true;
            expect = Monday + Tuesday + Wednesday + Thursday + Friday + Saturday + Sunday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Mo = false;
            expect = Tuesday + Wednesday + Thursday + Friday + Saturday + Sunday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Tu = false;
            expect = Wednesday + Thursday + Friday + Saturday + Sunday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            We = false;
            expect = Thursday + Friday + Saturday + Sunday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Th = false;
            expect = Friday + Saturday + Sunday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Fr = false;
            expect = Saturday + Sunday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Sa = false;
            expect = Sunday;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });
        });

        describe('Check for weekday in an integer', function () {
            /**
             * checks if a given integer (i) contains a certain (day) bit and calls the desired function (cb) according
             * to the given day.
             *
             * represents a solution so the loop tests actually work. The it function is called in this separate
             * function which is called from the loop instead.
             *
             * I still don't fully get why, but it works and is good enough for now. Maybe I get it by digging deeper
             * into nodejs and mocha when time goes by. :-)
             *
             * @param i     integer containing the desired day bit (0-127)
             * @param day   day value to test for
             * @param cb    callback function (i.e. 'HasTuesday' when day = Tuesday
             *
             * @description test function for the 'Has...' tests which return true or false when the integer parameter
             *      logically suites the given day.
             *      found this here: https://stackoverflow.com/questions/40101792/using-a-for-loop-in-a-mocha-test
             *
             * @example itTest(65, Friday, weekdays.HasFriday) calls the HasFriday function to check if 65 contains the
             *      Friday bit.
             */
            function itTest(i, day, cb) {
                var expected = ((i & day) === day);
                it(i + ' should return ' + expected, function () {
                    assert.equal(cb(i), expected, 'expected is:' + expected);
                });
            }

            describe('#HasMonday()', function () {
                var expected = false;
                for (var i = 0; i <= 127; i++) {
                    itTest(i, Monday, weekdays.HasMonday);
                }
            });

            describe('#HasTuesday()', function () {
                expected = false;
                for (var i = 0; i <= 127; i++) {
                    itTest(i, Tuesday, weekdays.HasTuesday);
                }
            });

            describe('#HasWednesday()', function () {
                expected = false;
                for (var i = 0; i <= 127; i++) {
                    itTest(i, Wednesday, weekdays.HasWednesday);
                }
            });

            describe('#HasThursday()', function () {
                expected = false;
                for (var i = 0; i <= 127; i++) {
                    itTest(i, Thursday, weekdays.HasThursday);
                }
            });

            describe('#HasFriday()', function () {
                expected = false;
                for (var i = 0; i <= 127; i++) {
                    itTest(i, Friday, weekdays.HasFriday);
                }
            });

            describe('#HasSaturday()', function () {
                expected = false;
                for (var i = 0; i <= 127; i++) {
                    itTest(i, Saturday, weekdays.HasSaturday);
                }
            });

            describe('#HasSunday()', function () {
                expected = false;
                for (var i = 0; i <= 127; i++) {
                    itTest(i, Sunday, weekdays.HasSunday);
                }
            });
        });
    });

    describe('rulevalidation.js', function () {
        // create rule stub
        var rule = {id: 1, Priority: 9999, From: '', To: '', DimTime: 30, Weekdays: 127};

        describe('#TimeIsInRange()', function () {

            it('should return true when time is in range', function () {
                var timenow = new Date(new Date().toLocaleString());
                timenow.setHours(timenow.getHours() - 1);
                rule.From = '0000;00;00;' + padStart(timenow.getHours(), 2, '0') + ';' + padStart(timenow.getMinutes(), 2, '0');
                timenow.setHours(timenow.getHours() + 2);
                rule.To = '0000;00;00;' + padStart(timenow.getHours(), 2, '0') + ';' + padStart(timenow.getMinutes(), 2, '0');

                assert.equal(rulevalidation.TimeIsInRange(rule), true);
            });

            it('should return false when time is out of range', function () {
                var timenow = new Date(new Date().toLocaleString());
                timenow.setHours(timenow.getHours() + 1);
                rule.From = '0000;00;00;' + padStart(timenow.getHours(), 2, '0') + ';' + padStart(timenow.getMinutes(), 2, '0');
                timenow.setHours(timenow.getHours() + 1);
                rule.To = '0000;00;00;' + padStart(timenow.getHours(), 2, '0') + ';' + padStart(timenow.getMinutes(), 2, '0');
                assert.equal(rulevalidation.TimeIsInRange(rule), false);
            });

        });

        /**
         * checks if today's bit is part of a given integer
         *
         * represents a solution so the loop tests actually work. The it function is called in this separate
         * function which is called from the loop instead.
         *
         * I still don't fully get why, but it works and is good enough for now. Maybe I get it by digging deeper
         * into nodejs and mocha when time goes by. :-)
         *
         * @param i     integer to be checked for today's bit
         * @param today integer value of today
         */
        function itTestToday(i, today) {
            rule.Weekdays = i;
            expected = ((i & today) === today);

            it('today (' + today + ') it should return ' + expected + ' when Weekdays is ' + rule.Weekdays, function () {
                assert.equal(rulevalidation.TodayIsTheCorrectWeekday(rule), expected);
            });
        }

        describe('#TodayIsTheCorrectWeekday()', function () {
            var timenow = new Date(new Date().toLocaleString());
            var today = Math.pow(2, timenow.getDay());
            expected = false;
            for (var i = 0; i <= 127; i++) {
                itTestToday(i, today);
            }
        });

        describe('#TodayIsInRuleRange()', function () {
            it('should return true when year day is in range', function () {
                rule.From = '0000;01;01;00;00';
                rule.To = '0000;12;31;00;00';
                assert.equal(rulevalidation.TodayIsInRuleRange(rule), true);
            });
            it('should return false if the day is out of range', function () {
                var timenow = new Date(new Date().toLocaleString());
                if (timenow.getDate() === 1) {
                    timenow.setDate(timenow.getDate() + 1);
                } else {
                    timenow.setDate(timenow.getDate() - 1);
                }
                rule.From = '0000;' + timenow.getMonth() + 1 + ';;00;00';
                rule.To = '9999;' + timenow.getMonth() + 1 + ';;00;00';
            });
        });

        describe('#YearIsInRuleRange()', function () {
            it('should return true if the year is in range', function () {
                rule.From = '0000;00;00;00;00';
                rule.To = '9999;00;00;00;00';
                assert.equal(rulevalidation.YearIsInRuleRange(rule), true);
            });
            it('should return false if the year is out of range', function () {
                rule.From = '1971;00;00;00;00';
                rule.To = '1981;00;00;00;00';
                assert.equal(rulevalidation.YearIsInRuleRange(rule), false);
            });
        });
    });
});
