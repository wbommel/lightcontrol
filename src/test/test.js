/**
 * Created by Bommel on 03.04.2018.
 */
//var describe = require("mocha");
var assert = require('assert');
var weekdays = require('../model/weekdays');
var rulevalidation = require('../model/rulevalidation');
var padStart = require('string.prototype.padstart');



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

        describe('#HasMonday()', function () {
            expected = false;
            for (var i = 0; i <= 127; i++) {
                expected = ((i & Monday) === Monday);
                describe('#HasMonday(' + i + ')', function () {
                    it('should return ' + expected, function () {
                        expected = ((i & Monday) === Monday);
                        assert.equal(weekdays.HasMonday(i), expected, 'expected is:' + expected);
                    });
                });
            }
        });

        describe('#HasTuesday()', function () {
            expected = false;
            for (var i = 0; i <= 127; i++) {
                expected = ((i & Tuesday) === Tuesday);
                describe('#HasTuesday(' + i + ')', function () {
                    it('should return ' + expected, function () {
                        expected = ((i & Tuesday) === Tuesday);
                        assert.equal(weekdays.HasTuesday(i), expected, 'expected is:' + expected);
                    });
                });
            }
        });

        describe('#HasWednesday()', function () {
            expected = false;
            for (var i = 0; i <= 127; i++) {
                expected = ((i & Wednesday) === Wednesday);
                describe('#HasWednesday(' + i + ')', function () {
                    it('should return ' + expected, function () {
                        expected = ((i & Wednesday) === Wednesday);
                        assert.equal(weekdays.HasWednesday(i), expected, 'expected is:' + expected);
                    });
                });
            }
        });

        describe('#HasThursday()', function () {
            expected = false;
            for (var i = 0; i <= 127; i++) {
                expected = ((i & Thursday) === Thursday);
                describe('#HasThursday(' + i + ')', function () {
                    it('should return ' + expected, function () {
                        expected = ((i & Thursday) === Thursday);
                        assert.equal(weekdays.HasThursday(i), expected, 'expected is:' + expected);
                    });
                });
            }
        });

        describe('#HasFriday()', function () {
            expected = false;
            for (var i = 0; i <= 127; i++) {
                expected = ((i & Friday) === Friday);
                describe('#HasFriday(' + i + ')', function () {
                    it('should return ' + expected, function () {
                        expected = ((i & Friday) === Friday);
                        assert.equal(weekdays.HasFriday(i), expected, 'expected is:' + expected);
                    });
                });
            }
        });

        describe('#HasSaturday()', function () {
            expected = false;
            for (var i = 0; i <= 127; i++) {
                expected = ((i & Saturday) === Saturday);
                describe('#HasSaturday(' + i + ')', function () {
                    it('should return ' + expected, function () {
                        expected = ((i & Saturday) === Saturday);
                        assert.equal(weekdays.HasSaturday(i), expected, 'expected is:' + expected);
                    });
                });
            }
        });

        describe('#HasSunday()', function () {
            expected = false;
            for (var i = 0; i <= 127; i++) {
                expected = ((i & Sunday) === Sunday);
                describe('#HasSunday(' + i + ')', function () {
                    it('should return ' + expected, function () {
                        expected = ((i & Sunday) === Sunday);
                        assert.equal(weekdays.HasSunday(i), expected, 'expected is:' + expected);
                    });
                });
            }
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

        describe('#TodayIsTheCorrectWeekday()', function () {
            var timenow = new Date(new Date().toLocaleString());
            var today = Math.pow(2, timenow.getDay());
            expected = false;
            for (var i = 0; i <= 127; i++) {
                rule.Weekdays = i;
                expected = ((i & today) === today);

                it('today (' + today + ') it should return ' + expected + ' when Weekdays is ' + rule.Weekdays, function () {
                    assert.equal(rulevalidation.TodayIsTheCorrectWeekday(rule), expected);
                });
            }
        });

        //describe('',function(){});
    });
});
