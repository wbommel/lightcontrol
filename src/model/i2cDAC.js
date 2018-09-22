'use strict'

/**
 * What it should do:
 * 
 * 1. init
 *      - hwAdress i.e. 0x48
 * 2. write value
 * 3. notify when written ??? (not yet. TODO : implement as pub/sub module)
 * 4. offer current value as property
 */



/**
* main module object declaration
*/
let i2cDAC = {
  init: function (loggerFunc, hwAdress) {
    loggerCallback = loggerFunc
    _initHardware(hwAdress)
    return this
  },
  writeDacValue: function (value) { _writeDAC(value) },
  getHardwareAddress: function () { return addressPcf8591 },
  getDacValue: function () { return dacValue }
}

module.exports = i2cDAC



/**
 * set up hardware objects and variables
 */
let addressPcf8591
let i2c
let i2c1
let dacValue = 0

let i2cInitialized

let loggerCallback



/**********************************************************************************************************************
 * private functions
 *********************************************************************************************************************/

/***********************
* Initialize hardware *
***********************/
function _initHardware(hwAdress) {
  //set important module wide variables
  addressPcf8591 = hwAdress

  //Init I2C bus hardware
  try {
    i2c = require('i2c-bus') // package to communicate via i2c
    i2c1 = i2c.openSync(1) // open i2c bus 1

    _writeDAC(0)
    i2cInitialized = true
    toLogger("Created and initialized 'i2c-bus' i2c1")
  } catch (error) {
    i2cInitialized = false
    toLogger("Could not create 'i2c-bus'...")
  }
}

/**
 * logs everything to the logger callback function if exists
 * wrapper of the callback delegate
 * @param {*} message
 */
function toLogger(message) {
  if (typeof loggerCallback === 'function') {
    loggerCallback(message)
  }
}

/**
* function to write a value to the DAC
* @param value
*/
function _writeDAC(value) {
  if (!Number.isInteger(value)) {
    toLogger('writeDAC: value not integer')
  }
  if (value < 0) {
    toLogger('writeDAC: value < 0')
  }
  if (value > 0xff) {
    toLogger('writeDAC: value > 0xff')
  }

  // only write when legal
  if (Number.isInteger(value) && value >= 0 && value <= 0xff) {
    try {
      i2c1.writeByteSync(pcf8591Address, CMD_ACCESS_CONFIG, value)
      dacValue = value
    } catch (error) {
      toLogger('Error writing to PCF8591 DAC...')
    }
  }
}
