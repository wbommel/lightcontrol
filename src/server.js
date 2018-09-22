'use strict';

/**
 * global requirements
 */
const hwGpio = require('./gpio.js')
const hwI2c = require('./i2cDAC.js')
const dbaccess = require('./model/dbaccess.js')       // database access stuff

const express = require('express');                   // express library
const app = express();                                // express Application
const server = require('http').createServer(app);     // web server
const io = require('socket.io').listen(server);       // websocket
const util = require('util');                         // string formatting etc
const fs = require('fs');                             // filesystem operations (for reading external html code i.error.
//      for rule editor popup

const calculations = require('./model/calculations'); // calculations
const logger = require('./logger.js');                // test own logger class

const conf = require('./config.json');                // configuration (server port etc)




let lightControlGpio = hwGpio
lightControlGpio.init(toLog, conf.hardware.gpios.Relais1, conf.hardware.gpios.Relais2, conf.hardware.gpios.ButtonAutomatic, conf.hardware.gpios.ButtonManualLightOn, conf.hardware.gpios.ButtonManualLightOff, conf.hardware.Pcf8591Address)
lightControlGpio.setPower(true)
lightControlGpio.writeRelais1(true)
lightControlGpio.writeRelais2(true)
lightControlGpio.getRelais1Value()
lightControlGpio.getRelais2Value()


let lightControlI2C = hwI2c
lightControlI2C.init(toLog, 0x48)
lightControlI2C.writeDacValue(0xFF)
lightControlI2C.getDacValue()
lightControlI2C.getHardwareAddress()

const cater = require('./mamals.js')
let mark = cater.init('mark', 0x48)
console.log('name: ' + mark.name)


let dbHandler = dbaccess
dbHandler.Init(toLog, conf.database.host, conf.database.port, conf.database.username, 'Warlock', conf.database.dbname, conf.database.rulestable)
dbHandler.Rules
dbHandler.AnalyzeRules(function(a){})




/**
 * global variable declarations
 */

//create minimal rule stub and dimValue
let currentRule

//database check interval in seconds
let databaseCheckInterval = 5

//global debug switch
let showDebugInfo = false

//global mode selector (default=1)
// 0 = manual mode
// 1 = automatic mode
let mode = 1

//client refresh interval in ms
let refreshInterval = 1000

//read external html data
let externalWebTest = fs.readFileSync(__dirname + '/public/webtest.html', 'UTF-8')

//all db light rules
let allLightRules

//local calculated dim value
let dimValue



/**
 * global initialisations
 */
logger.DoLogMessages = showDebugInfo;
logger.UseUnixTimeStampPrefix = true;

//start up web server
server.listen(conf.port);

//statische Dateien ausliefern
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // wenn der Pfad / aufgerufen wird
    // so wird die Datei index.html ausgegeben
    res.sendfile(__dirname + '/public/index.html');
});

// Portnummer in die Konsole schreiben
console.log('Der Server läuft nun unter http://127.0.0.1:' + conf.port + '/');





//enter  automatic mode
setInterval(_automaticMode, 1000);


/**********************************************************************************************************************
 * socket connect listeners                                                                                           *
 **********************************************************************************************************************/
//when a socket client connects
io.sockets.on('connection', function (socket) {
    //register logger callback
    logger.LoggerCallbackFunction = loggerCB;

    //log to console when a client connects
    toLog('client connected');

    //initialize client
    // socket.emit('client-initialize', {
    //     ClientRefreshInterval: refreshInterval,
    //     DatabaseCheckInterval: databaseCheckInterval,
    //     Mode: mode,
    //     ShowDebugInfoSwitch: showDebugInfo,
    //     CalculatedDimValue: dimValue,
    //     SocketId: socket.id,
    //     ManualLampOn: manualLampOn,
    //     ServerStatusMessage: 'not yet defined...'
    // });

    //refresh clients every second or so
    setInterval(_clientRefresh, refreshInterval);



    //socket listeners *************************************************************************************************
    socket.on('debugInfoChanged', function (data) {
        showDebugInfo = data.ShowDebugInfoSwitch;
        logger.DoLogMessages = showDebugInfo;
        toLog(util.format('emitted by client: debugInfoChanged = %s', data.ShowDebugInfoSwitch));
    });

    socket.on('toggleMode', function (data) {
        let modeOld = mode;
        if (mode === 0) {
            mode = 1;
            _fFirstRun = true;
        } else {
            mode = 0;
            dimValue = 0;
            //setHardware();
        }
        toLog(util.format('Mode toggled by client from %d to %d.', modeOld, mode));
    });

    socket.on('manualSliderValueChanged', function (data) {
        dimValue = parseInt(data.SliderValue);
        // setHardware();
        toLog(util.format('\tslider.value: %d', data.SliderValue));
    });

    socket.on('getLightrulesData', function (data) {
        socket.emit('returnLightrulesData', {
            AllRules: allLightRules
        });
    });
    //socket listeners *************************************************************************************************



    // socket dependant function declarations **************************************************************************
    /**
     * refreshes the connected clients
     * @private
     */
    function _clientRefresh() {
        let now = new Date(new Date().toLocaleString());

        //send server status
        // let serverStatusMessage =
        //     util.format('Server Time&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', now) + '<br/>' +
        //     util.format('ClientRefreshInterval: %dms', refreshInterval) + '<br/>' +
        //     util.format('DatabaseCheckInterval: %ds', databaseCheckInterval) + '<br/>' +
        //     util.format('Mode&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %d', mode) + '<br/>' +
        //     util.format('ShowDebugInfoSwitch&nbsp&nbsp: %s', showDebugInfo) + '<br/>' +
        //     util.format('CalculatedDimValue&nbsp&nbsp&nbsp: %d', dimValue) + '<br/>' +
        //     util.format('HardwareDimValue&nbsp&nbsp&nbsp&nbsp&nbsp: %d', dacValue) + '<br/>' +
        //     util.format('GpioValue&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %d', ledValue) + '<br/>' +
        //     util.format('socket.id&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', socket.id) + '<br/>' +
        //     util.format('ManualLampOn&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', manualLampOn) + '<br/>' +
        //     util.format('CurrentRule&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', currentRule ? util.format('rule: [id:%d, Priority:%d, From:\'%s\', To:\'%s\', DimTime:%d, Weekdays:%d]', currentRule.id, currentRule.Priority, currentRule.From, currentRule.To, currentRule.DimTime, currentRule.Weekdays) : 'null');
        socket.emit('debugInfo', {
            ServerTime: now,
            ClientRefreshInterval: refreshInterval,
            DatabaseCheckInterval: databaseCheckInterval,
            Mode: mode,
            ShowDebugInfoSwitch: showDebugInfo,
            CalculatedDimValue: dimValue,
            // HardwareDimValue: dacValue,
            // GpioValue: ledValue,
            SocketId: socket.id,
            // ManualLampOn: manualLampOn,
            CurrentRule: currentRule,
            // ServerStatusMessage: serverStatusMessage
        });
    }



    function loggerCB(data) {
        socket.emit('debugLogMessage', { Message: data.Message });
    }
});


// global function declarations ****************************************************************************************

/**
 * automatic mode function
 * @private
 */
function _automaticMode() {

    //check mode first
    if (mode === 0) { // Manual mode
        if (currentRule) {
            currentRule = null;
        }
    }
    else if (mode === 1) { //Automatic mode
        _doDatabaseStuff()

        //get dimValue
        dimValue = calculations.CalcDimValueByRule(currentRule);

        //write to hardware
        //setHardware();
    }
}

/**
 * database related functions
 */
let _fFirstRun = true; //indicate first iteration
function _doDatabaseStuff() {
    let now = new Date(new Date().toLocaleString());
    let modulus = ((now / 1000) % databaseCheckInterval);

    //check for rules every 5 seconds
    if (modulus === 0 || _fFirstRun) {
        //reset "first run" bool if so
        if (_fFirstRun) { _fFirstRun = false; }

        toLog('\tcheck database for rules...');
        dbaccess.AnalyzeRules(function (rules, rule, error) {
            if (error) {
                toLog('\terror connecting to db...');
            } else {
                toLog('\tcheck database for rules... done.');

                currentRule = rule;

                allLightRules = [];
                for (let i in rules) {
                    allLightRules.push({
                        id: rules[i].id,
                        Priority: rules[i].Priority,
                        From: rules[i].From,
                        To: rules[i].To,
                        DimTime: rules[i].DimTime,
                        Weekdays: rules[i].Weekdays
                    });
                }
            }
        })
    }
}




//debugging ****************************
toLog('current light rule:');
if (currentRule) {
    toLog(util.format('\trule: [id:%d,Priority:%d,From:\'%s\',To:\'%s\',DimTime:%d,Weekdays:%d]', currentRule.id, currentRule.Priority, currentRule.From, currentRule.To, currentRule.DimTime, currentRule.Weekdays));
}
//toLog(util.format('dimValue: %d', dimValue));
//toLog(util.format('dbaccess.Rules: %o', dbaccess.Rules));//TODO: not working since undefined, why?
//toLog(util.format('allLightRules : %o', allLightRules));
//toLog('connected clients:');
if (showDebugInfo) {
    io.sockets.clients(function (error, clients) {
        if (error) throw error;

        clients.forEach(function (item, index) {
            toLog(util.format('\tclient %d: %s', ++index, item));
        })
    });
}




/**
 * logs to console with a timestamp and only if the global debug switch is set
 * @param Message
 */
function toLog(Message) {
    logger.LogIt(Message);
}




/**
 * system process listeners
 */
//on ctrl+c
process.on('SIGINT', function () {
    process.exit(); //exit completely
});

