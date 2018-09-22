'use strict';

var assert = require('assert');


describe('testing model', function () {

    describe('testing module hardware.js', function () {

        describe('require module', function () {

            it('reference should not be null', function () {
                const hardwarejs = require('../hardware');
                assert.equal(hardwarejs === null, false);
            });

        });

        describe('Default GPIO for', function () {
            const hardwarejs = require('../hardware');

            it('Relais1 should be 23', function () {
                assert.equal(hardwarejs.GpioRelais1, 23);
            });

            it('Relais2 should be 24', function () {
                assert.equal(hardwarejs.GpioRelais2, 24);
            });

            it('ButtonAutomatic should be 4', function () {
                assert.equal(hardwarejs.GpioButtonAutomatic, 4);
            });

            it('ButtonManualOn should be 17', function () {
                assert.equal(hardwarejs.GpioButtonManualLightOn, 17);
            });

            it('ButtonManualOff should be 27', function () {
                assert.equal(hardwarejs.GpioButtonManualLightOff, 27);
            });

        });

    });

});