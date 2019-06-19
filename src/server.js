"use strict";

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

const websocket = require('socket.io').listen(server);  // websocket library

// instanciate logger to be able to ... well, .. log something. :-)
const moduleLogger = require('./model/logger.js')
let logger = Object.create(moduleLogger).Init(util)
logger.LogLevel = conf.logging.LogLevel
logger.UseUnixTimeStampPrefix = conf.logging.UseUnixTimeStampPrefix
logger.DoLogMessages = conf.logging.DoLogMessages
logger.OutputToConsole = conf.logging.OutputToConsole
logger.OutputToCallback = conf.logging.OutputToCallback


/**
* hardware dependant requirements which can fail when the hardware is not present
*
*   i.e. this module is for a RaspberryPi developed on a PC lacking i2c and GPIO hardware,
*   so it should be a good practice to create those instances within a try/catch to
*   be able to make a valid development even on a PC.
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
const moduleWebservice = require('./model/webservice.js')           //
const moduleGpio = require('./model/gpio.js')                       //
const moduleLightControl = require('./model/lightcontrol.js')       // main control module
const moduleConfigEditor=require('./model/configeditor.js')         // config editor functionality
logger.LogIt('creating instances of further project modules successful', logger.LogLevelInformation)

logger.LogIt('initializing RuleValidation module', logger.LogLevelInformation)
let rv = Object.create(moduleRuleValidation).Init({ weekdays, padStart, logger })
logger.LogIt('initializing RuleValidation module successful', logger.LogLevelInformation)

logger.LogIt('initializing DbAccess module', logger.LogLevelInformation)
let dbaccess = Object.create(moduleDbaccess).Init({ util, rv, mysql, logger, conf: conf.database })
logger.LogIt('initializing DbAccess module successful', logger.LogLevelInformation)

logger.LogIt('initializing Calculations module', logger.LogLevelInformation)
let calculations = Object.create(moduleCalculations).Init({ logger })
logger.LogIt('initializing Calculations module successful', logger.LogLevelInformation)

logger.LogIt('initializing HardwareIO module', logger.LogLevelInformation)
let hardwareGpio = Object.create(moduleGpio).Init({ gpio, logger, conf: conf.hardware.gpios })
logger.LogIt('initializing HardwareIO module successful', logger.LogLevelInformation)

logger.LogIt('initializing Webservice module', logger.LogLevelInformation)
let webservice = Object.create(moduleWebservice).Init({ express, app, server, websocket, util, logger })
logger.LogIt('initializing Webservice module successful', logger.LogLevelInformation)

logger.LogIt('initializing lightcontrol module', logger.LogLevelInformation)
let lightcontrol = Object.create(moduleLightControl).Init({ logger, conf, util, webservice })
logger.LogIt('initializing lightcontrol module successful', logger.LogLevelInformation)

logger.LogIt('initializing config editor module', logger.LogLevelInformation)
let configeditor = Object.create(moduleConfigEditor).Init({ logger, conf, websocket, webservice })
logger.LogIt('initializing config editor module successful', logger.LogLevelInformation)





// hardwareGpio.on('relaisWriteReceived', function () {
//     logger.LogIt('event fired successfully (relaisWriteReceived)', logger.LogLevelInformation)
// })
hardwareGpio.SetPower(1)

//dbaccess.AnalyzeRules(function () { console.log('Success!!!') })
//calculations.CalcDimValueByRule(rule)
webservice.StartServer(conf.port)
//hardwareIO.GetRelais1Value()




logger.LogIt('Hooray...')


/**
 * This part should be commented out in production environment
 */
logger.LogIt('')
logger.LogIt('Now for the integration tests...')


