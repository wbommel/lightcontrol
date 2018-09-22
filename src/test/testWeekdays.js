let assert = require('assert')
let weekdays = require('../model/weekdays.js')


describe('Testing module weekdays', function () {
    describe('function WeekdaysToInt', function () {
        for (let integer = 0; integer < 256; integer++) {
            it('should return ' + integer, function () {
                weekdays.WeekdaysToInt()
            })
        }
    })
})

function toConsole(message) { console.log(message) }