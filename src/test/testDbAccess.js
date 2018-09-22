const assert = require('assert')
const dbaccess = require('../model/dbaccess.js')

describe('dbaccess', function () {
    describe('AnalyzeRules', function () {
        it('should throw an exception if not initialized', function () {
            try {
                dbaccess.AnalyzeRules(function () { assert.equal(false, true) });
            } catch (error) {
                assert.equal(true, true)
            }
        });
        it('should NOT throw an exception if initialized.', function () {
            try {
                dbaccess.Init(function () { })
                dbaccess.AnalyzeRules(function () { assert.equal(true, true) });
            } catch (error) {
                console.log('Exception. Catch statement: %o',error)
                assert.equal(false, true)
            }
        })
    });
});
