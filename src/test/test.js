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
    describe('weekdays.js', function () {
        var Monday = 1;
        var Tuesday = 2;
        var Wednesday = 4;
        var Thursday = 8;
        var Friday = 16;
        var Saturday = 32;
        var Sunday = 64;

        describe('#WeekdaysToInt()', function () {
            var Mo = false, Tu = false, We = false, Th = false, Fr = false, Sa = false, Su = false, expect = 0;

            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });
            Mo = true;
            expect = 1;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Tu = true;
            expect = 3;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            We = true;
            expect = 7;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Th = true;
            expect = 15;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Fr = true;
            expect = 31;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Sa = true;
            expect = 63;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Su = true;
            expect = 127;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Mo = false;
            expect = 126;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Tu = false;
            expect = 124;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            We = false;
            expect = 120;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Th = false;
            expect = 112;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Fr = false;
            expect = 96;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });

            Sa = false;
            expect = 64;
            describe('#WeekdaysToInt(' + Mo + ', ' + Tu + ', ' + We + ', ' + Th + ', ' + Fr + ', ' + Sa + ', ' + Su + ')', function () {
                it('should return ' + expect, function () {
                    assert.equal(weekdays.WeekdaysToInt(Mo, Tu, We, Th, Fr, Sa, Su), expect);
                });
            });
        });

        describe('#HasMonday()', function () {
            var expected = false;
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
            var expected = false;
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
            var expected = false;
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
            var expected = false;
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
            var expected = false;
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
            var expected = false;
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
            var expected = false;
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
            var timenow = new Date(new Date().toLocaleString());
            rule.From = '0000;00;00;' + padStart(timenow.setHours(timenow.getHours() - 1), 2, '0') + ';' + padStart(timenow.getMinutes(), 2, '0');
            rule.To = '0000;00;00;' + padStart(timenow.setHours(timenow.getHours() + 1), 2, '0') + ';' + padStart(timenow.getMinutes(), 2, '0');

            it('should return true when time is in range', function () {
                assert.equal(rulevalidation.TimeIsInRange(rule), true);
            });
        });
    });
});
