'use strict'



/**
 * main module object declaration
 */
let hardware = {
  init: function (loggerFunc, ButtonAutomaticFunc, ButtonManualLightOnFunc, ButtonManualLightOffFunc, gpioRelais1, gpioRelais2, gpioButtonAutomatic, gpioButtonManualLightOn, gpioButtonManualLightOff) {
    cbLogger = loggerFunc
    cbButtonAutomatic = ButtonAutomaticFunc
    cbButtonManualLightOn = ButtonManualLightOnFunc
    cbButtonManualLightOff = ButtonManualLightOffFunc
    _initHardware(gpioRelais1, gpioRelais2, gpioButtonAutomatic, gpioButtonManualLightOn, gpioButtonManualLightOff)
    return this
  },
  writeRelais1: function (value) {
    _writeRelais(Relais1, value)
  },
  writeRelais2: function (value) {
    _writeRelais(Relais2, value)
  },
  setPower: function (value) {
    this.writeRelais1(value)
    this.writeRelais2(value)
  },
  getRelais1Value: function () {
    if (Relais1 && typeof Relais1.readSync === 'function') {
      return Relais1.readSync() === relaisTrueValue
    }
    return null
  },
  getRelais2Value: function () {
    if (Relais2 && typeof Relais2.readSync === 'function') {
      return Relais2.readSync() === relaisTrueValue
    }
    return null
  }
}

module.exports = hardware



/**
 * set up hardware objects and variables
 */
let GPIO
let Relais1
let Relais2
let ButtonAutomatic
let ButtonManualLightOn
let ButtonManualLightOff
let cbButtonAutomatic
let cbButtonManualLightOn
let cbButtonManualLightOff

let gpioInitialized
let relaisReadyToWrite

let cbLogger

/**
 * constants
 */
const relaisTrueValue = 0;
const relaisFalseValue = 1;





/**********************************************************************************************************************
 * private functions
 *********************************************************************************************************************/

/**
 * button watchers
 */
function _buttonAutomaticWatch(err, value) {
  if (typeof cbButtonAutomatic === 'function') { cbButtonAutomatic() }
  toLogger('button automatic clicked...')
}
function _buttonManualLightOnWatch(err, value) {
  if (typeof cbButtonManualLightOn === 'function') { cbButtonManualLightOn() }
  toLogger('button light on clicked...')
}
function _buttonManualLightOffWatch(err, value) {
  if (typeof cbButtonManualLightOff === 'function') { cbButtonManualLightOff() }
  toLogger('button light off clicked...')
}

/***********************
 * Initialize hardware *
 ***********************/
function _initHardware(gpioRelais1, gpioRelais2, gpioButtonAutomatic, gpioButtonManualLightOn, gpioButtonManualLightOff) {
  //Init GPIO hardware
  try {
    GPIO = require('onoff').Gpio

    //configure relais
    Relais1 = new GPIO(gpioRelais1, 'out')
    Relais2 = new GPIO(gpioRelais2, 'out')

    //configure buttons
    ButtonAutomatic = new Gpio(gpioButtonAutomatic, 'in', 'both')
    ButtonAutomatic.watch(function (err, value) { _buttonAutomaticWatch(err, value) });
    ButtonManualLightOn = new Gpio(gpioButtonManualLightOn, 'in', 'both')
    ButtonAutomatic.watch(function (err, value) { _buttonManualLightOnWatch(err, value) });
    ButtonManualLightOff = new Gpio(gpioButtonManualLightOff, 'in', 'both')
    ButtonAutomatic.watch(function (err, value) { _buttonManualLightOffWatch(err, value) });

    gpioInitialized = true
    relaisReadyToWrite = true
    toLogger("Created and initialized 'onoff' GPIO")
  } catch (error) {
    gpioInitialized = false
    toLogger("Error creating 'onoff' GPIO")
  }
}

/**
 * logs everything to the logger callback function if exists
 * wrapper of the callback delegate
 * @param {*} message
 */
function toLogger(message) {
  if (typeof cbLogger === 'function') {
    cbLogger(message)
  }
}

/**
 * switches relais on or off
 * @param {*} value 
 */
function _writeRelais(relais, value) {
  if (!relaisReadyToWrite) { return }

  relaisValue = value ? relaisTrueValue : relaisFalseValue;

  if (relais.readSync() !== relaisValue) {
    relais.writeSync(relaisValue);

    relaisReadyToWrite = false;
    setTimeout(function () { relaisReadyToWrite = true }, 2000)
  }
}
