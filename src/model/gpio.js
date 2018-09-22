'use strict'

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



/**
 * main module object declaration
 */
module.exports = {
  Init: function (diGpio, loggerFunc, ButtonAutomaticFunc, ButtonManualLightOnFunc, ButtonManualLightOffFunc, gpioRelais1, gpioRelais2, gpioButtonAutomatic, gpioButtonManualLightOn, gpioButtonManualLightOff) {
    GPIO = diGpio
    cbLogger = loggerFunc
    cbButtonAutomatic = ButtonAutomaticFunc
    cbButtonManualLightOn = ButtonManualLightOnFunc
    cbButtonManualLightOff = ButtonManualLightOffFunc
    _initHardware(gpioRelais1, gpioRelais2, gpioButtonAutomatic, gpioButtonManualLightOn, gpioButtonManualLightOff)
    return this
  },
  WriteRelais1: function (value) {
    if (GPIO !== null) {
      _writeRelais(Relais1, value)
    }
  },
  WriteRelais2: function (value) {
    if (GPIO !== null) {
      _writeRelais(Relais2, value)
    }
  },
  SetPower: function (value) {
    this.WriteRelais1(value)
    this.WriteRelais2(value)
  },
  GetRelais1Value: function () {
    if (GPIO !== null) {
      if (Relais1 && typeof Relais1.readSync === 'function') {
        return Relais1.readSync() === relaisTrueValue
      }
    }
    return null
  },
  GetRelais2Value: function () {
    if (GPIO !== null) {
      if (Relais2 && typeof Relais2.readSync === 'function') {
        return Relais2.readSync() === relaisTrueValue
      }
    }
    return null
  }
}








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
  if (GPIO === null) { return }

  //Init GPIO hardware
  try {
    //GPIO = require('onoff').Gpio // done through dependency injection

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
