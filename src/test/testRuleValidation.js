import mocha from 'mocha';
import { expect } from 'chai';
import  assert  from 'assert';

import rv from '../model/rulevalidation';
let ruleValidation = rv.Init(null)

describe('rulevalidation', () => {
    it('should not be null', () => {
        assert.equal(true,true,'Jupp')
        // expect(true === true)
        // done()
    })
})



