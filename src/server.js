'use strict';

/************************************************************************************************************************
 * requirements
 * 
 * as of implementation of the dependency injection pattern, 
 * every requirement desired by submodules will be created here.
 ************************************************************************************************************************/

/**
 * configuration
 */
const conf = require('./config.json');

/**
* independant global requirements
*/
const util = require('util')                            // parameterized string formater
const padStart = require('string.prototype.padstart')   // string format i.e.  leading zeros for numbers 
const mysql = require('mysql')                          // mysql/mariadb database engine

const express = require('express');                     // express library http server
const app = express();                                  // express Application
const server = require('http').createServer(app);       // web server

const io = require('socket.io').listen(server);         // websocket library

// instanciate logger to be able to ... well, .. log something. :-)
const moduleLogger = require('./model/logger.js')
let logger = moduleLogger.Init(util)
logger.LogLevel = conf.logging.LogLevel
logger.UseUnixTimeStampPrefix = conf.logging.UseUnixTimeStampPrefix
logger.DoLogMessages = conf.logging.DoLogMessages
logger.OutputToConsole = conf.logging.OutputToConsole
logger.OutputToCallback = conf.logging.OutputToCallback


/**
* hardware dependant global requirements
*/
let i2c                                                 // i2c library
logger.LogIt('try to create i2c-bus instance', logger.LogLevelInformation)
try {
    i2c = require('i2c-bus')
    logger.LogIt('i2c-bus instance successfully created', logger.LogLevelInformation)
} catch (error) {
    i2c = null
    logger.LogIt('error creating i2c-bus instance. ' + error, logger.LogLevelError)
}

let gpio                                                // GPIO library i.e. for RaspberryPi
logger.LogIt('try to create onoff instance', logger.LogLevelInformation)
try {
    gpio = require('onoff').Gpio
    logger.LogIt('onoff instance successfully created', logger.LogLevelInformation)
} catch (error) {
    gpio = null
    logger.LogIt('error creating onoff instance. ' + error, logger.LogLevelError)
}

/**
 * project modules
 */
logger.LogIt('creating instances of further project modules', logger.LogLevelInformation)
const weekdays = require('./model/weekdays.js')                     // weekday calculation library
const moduleRuleValidation = require('./model/rulevalidation.js')   // light rule validation library
const moduleDbaccess = require('./model/dbaccess.js')               // database access layer
const moduleCalculations = require('./model/calculations.js')       // 
const moduleSocketIo = require('./model/webservice.js')             //
const moduleGpio = require('./model/gpio.js')                       //
logger.LogIt('creating instances of further project modules successful', logger.LogLevelInformation)

logger.LogIt('initializing RuleValidation module',logger.LogLevelInformation)
let rv = moduleRuleValidation.Init(weekdays, padStart, logger.LogIt)
logger.LogIt('initializing RuleValidation module successful',logger.LogLevelInformation)
logger.LogIt('initializing DbAccess module',logger.LogLevelInformation)
let dbaccess = moduleDbaccess.Init(util, rv, mysql, logger.LogIt)
logger.LogIt('initializing DbAccess module successful',logger.LogLevelInformation)
logger.LogIt('initializing Calculations module',logger.LogLevelInformation)
let calculations = moduleCalculations.Init(logger.LogIt)
logger.LogIt('initializing Calculations module successful',logger.LogLevelInformation)
logger.LogIt('initializing SocketIo module',logger.LogLevelInformation)
let socketIo = moduleSocketIo.Init(express, app, server, io, logger.LogIt)
logger.LogIt('initializing SocketIo module successful',logger.LogLevelInformation)
logger.LogIt('initializing HardwareIO module',logger.LogLevelInformation)
let hardwareIO = moduleGpio.Init(gpio, logger.LogIt, conf.hardware.gpios.Relais1, conf.hardware.gpios.Relais2, conf.hardware.gpios.ButtonAutomatic, conf.hardware.gpios.ButtonManualLightOn, conf.hardware.gpios.ButtonManualLightOff, conf.hardware.Pcf8591Address)
logger.LogIt('initializing HardwareIO module successful',logger.LogLevelInformation)

//dbaccess.AnalyzeRules(function () { console.log('Success!!!') })
//calculations.CalcDimValueByRule(rule)
socketIo.StartServer(conf.port)
//hardwareIO.GetRelais1Value()




logger.LogIt('Hooray...')