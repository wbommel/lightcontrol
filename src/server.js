/**
 * global requirements
 */
const express = require('express');                   // express library
const app = express();                                // express Application
const server = require('http').createServer(app);     // web server
const io = require('socket.io').listen(server);       // websocket
const conf = require('./config.json');                // configuration (server port etc)
const dbaccess = require('./model/dbaccess');         // database access stuff
const calculations = require('./model/calculations'); // calculations
const util = require('util');                         // string formatting etc
const fs = require('fs');                             // filesystem operations (for reading external html code i.e.
                                                      //      for rule editor popup
const winston = require('winston');                   // winston logger (https://github.com/winstonjs/winston)
const logger = require('./logger.js');                // test own logger class


/**
 * constants
 */
const ledTrueValue = 0;
const ledFalseValue = 1;

//winston logger
// const logger = winston.createLogger({
//     transports: [
//         new winston.transports.Console()
//     ]
// });



/**
 * global variable declarations
 */

//create minimal rule stub and dimValue
let currentRule;
let dimValue = 0;

//database check interval
let databaseCheckInterval = 5;

//global debug switch
let showDebugInfo = false;

//global mode selector (default=1)
// 0 = manual mode
// 1 = automatic mode
let mode = 1;

//client refresh interval in ms
let refreshInterval = 1000;

//read external html data
let externalWebTest = fs.readFileSync(__dirname + '/public/webtest.html', 'UTF-8');

//manual lamp switch
let manualLampOn = false;

//LED switch value
let ledValue = ledFalseValue;

//all db light rules
let allLightRules;



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



/**
 * initialize hardware relevant stuff
 */
let Gpio;
let LED1;
let LED2;
try {
    Gpio = require('onoff').Gpio;
    LED1 = new Gpio(23, 'out');
    LED2 = new Gpio(24, 'out');

    LED1.writeSync(ledFalseValue);
    LED2.writeSync(ledFalseValue);

    toLog('Created and initialized \'onoff\' LED1=GPIO23, LED2=GPIO24');
} catch (e) {
    toLog('Could not create \'onoff\'...');
}

let i2c;
let i2c1;
try {
    i2c = require('i2c-bus');	//package to communicate via i2c
    i2c1 = i2c.openSync(1);		//open i2c bus 1
    writeDAC(0);

    toLog('Created and initialized \'i2c-bus\' i2c1');
} catch (e) {
    toLog('Could not create \'i2c-bus\'...');
}
const PCF8591_ADDR = 0x48;		//adress of PCF8591 on i2c bus (i2cdetect -y 1)
const CMD_ACCESS_CONFIG = 0x41;	//'adress' of DAC in the PCF8591
let dacValue = 0;



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
    socket.emit('client-initialize', {
        ClientRefreshInterval: refreshInterval,
        DatabaseCheckInterval: databaseCheckInterval,
        Mode: mode,
        ShowDebugInfoSwitch: showDebugInfo,
        CalculatedDimValue: dimValue,
        SocketId: socket.id,
        ManualLampOn: manualLampOn,
        ServerStatusMessage: 'not yet defined...'
    });

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
            firstRun = true;
        } else {
            mode = 0;
            dimValue = 0;
            setHardware();
        }
        toLog(util.format('Mode toggled by client from %d to %d.', modeOld, mode));
    });

    socket.on('manualSliderValueChanged', function (data) {
        dimValue = parseInt(data.SliderValue);
        setHardware();
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
        let serverStatusMessage =
            util.format('Server Time&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', now) + '<br/>' +
            util.format('ClientRefreshInterval: %dms', refreshInterval) + '<br/>' +
            util.format('DatabaseCheckInterval: %ds', databaseCheckInterval) + '<br/>' +
            util.format('Mode&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %d', mode) + '<br/>' +
            util.format('ShowDebugInfoSwitch&nbsp&nbsp: %s', showDebugInfo) + '<br/>' +
            util.format('CalculatedDimValue&nbsp&nbsp&nbsp: %d', dimValue) + '<br/>' +
            util.format('HardwareDimValue&nbsp&nbsp&nbsp&nbsp&nbsp: %d', dacValue) + '<br/>' +
            util.format('GpioValue&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %d', ledValue) + '<br/>' +
            util.format('socket.id&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', socket.id) + '<br/>' +
            util.format('ManualLampOn&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', manualLampOn) + '<br/>' +
            util.format('CurrentRule&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', currentRule ? util.format('rule: [id:%d, Priority:%d, From:\'%s\', To:\'%s\', DimTime:%d, Weekdays:%d]', currentRule.id, currentRule.Priority, currentRule.From, currentRule.To, currentRule.DimTime, currentRule.Weekdays) : 'null');
        socket.emit('debugInfo', {
            ServerTime: now,
            ClientRefreshInterval: refreshInterval,
            DatabaseCheckInterval: databaseCheckInterval,
            Mode: mode,
            ShowDebugInfoSwitch: showDebugInfo,
            CalculatedDimValue: dimValue,
            HardwareDimValue: dacValue,
            GpioValue: ledValue,
            SocketId: socket.id,
            ManualLampOn: manualLampOn,
            CurrentRule: currentRule,
            ServerStatusMessage: serverStatusMessage
        });
    }



    function loggerCB(data) {
        socket.emit('debugLogMessage', {Message: data.Message});
    }
});


/**
 * system process listeners
 */

//on ctrl+c
process.on('SIGINT', function () {
    // LED.writeSync(0); // Turn LED off
    // LED.unexport(); // Unexport LED GPIO to free resources
    // pushButton.unexport(); // Unexport Button GPIO to free resources
    process.exit(); //exit completely
});


// global function declarations ****************************************************************************************

/**
 * automatic mode function
 * @private
 */
let firstRun = true; //indicate first iteration
function _automaticMode() {

    //check mode first
    if (mode === 0) { // Manual mode
        if (currentRule) {
            currentRule = null;
        }
    }
    else if (mode === 1) { //Automatic mode
        let now = new Date(new Date().toLocaleString());
        let modulus = ((now / 1000) % databaseCheckInterval);

        //check for rules every 5 seconds
        if (modulus === 0 || firstRun) {
            if (firstRun) {
                firstRun = false;
            }
            dbaccess.GetAplyingRule(function (rules, rule, e) {
                    toLog('\tcheck database for rules...');

                    if (e) {
                        toLog('\terror connecting to db...');
                    }

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
            )
        }

        //get dimValue
        dimValue = calculations.CalcDimValueByRule(currentRule);

        //write to hardware
        setHardware();
    }


    //debugging ****************************
    toLog('current light rule:');
    if (currentRule) {
        toLog(util.format('\trule: [id:%d,Priority:%d,From:\'%s\',To:\'%s\',DimTime:%d,Weekdays:%d]', currentRule.id, currentRule.Priority, currentRule.From, currentRule.To, currentRule.DimTime, currentRule.Weekdays));
    }
    toLog(util.format('dimValue: %d', dimValue));
    //toLog(util.format('dbaccess.Rules: %o', dbaccess.Rules));//TODO: not working since undefined, why?
    //toLog(util.format('allLightRules : %o', allLightRules));
    toLog('connected clients:');
    if (showDebugInfo) {
        io.sockets.clients(function (error, clients) {
            if (error) throw error;

            clients.forEach(function (item, index) {
                toLog(util.format('\tclient %d: %s', ++index, item));
            })
        });
    }
}



/**
 * logs to console with a timestamp and only if the global debug switch is set
 * @param Message
 */
function toLog(Message) {
    logger.LogIt(Message);
    //logger.ToConsole(Message);

    if (showDebugInfo) {
        // var now = new Date(new Date().toLocaleString());
        // var debugStamp = now / 1000;
        // console.log('[%d]\t' + Message, debugStamp);

        //testing winston
        //logger.log({ level: 'info', message: Message });
    }
}



/**
 * sets the hardware stuff
 * TODO: refactor this to a separate class to have more control over the hardware connections (i.e. implement a timer after switching a GPIO to avoid flickering relais.
 */
function setHardware() {
    if (i2c1 && LED1 && LED2) {
        manualLampOn = dimValue > 0;
        ledValue = manualLampOn ? ledTrueValue : ledFalseValue;



        toLog(util.format('\t\tledValue: %d', ledValue));

        toLog(util.format('\t\tLED1.readSync(): %d', LED1.readSync()));
        toLog(util.format('\t\tLED2.readSync(): %d', LED2.readSync()));

        if (LED1.readSync() !== ledValue) {
            LED1.writeSync(ledValue);
        }
        if (LED2.readSync() !== ledValue) {
            LED2.writeSync(ledValue);
        }
        if (dacValue !== dimValue) {
            dacValue = dimValue;
            writeDAC(dacValue);
        }
    }
}



/**
 * function to write a value to the DAC
 * @param value
 */
function writeDAC(value) {

    if (!Number.isInteger(value)) {
        toLog('writeDAC: value not integer');
    }
    if (value < 0) {
        toLog('writeDAC: value < 0');
    }
    if (value > 0xff) {
        toLog('writeDAC: value > 0xff');
    }

    //only write when legal
    if (Number.isInteger(value) && value >= 0 && value <= 0xff) {
        i2c1.writeByteSync(PCF8591_ADDR, CMD_ACCESS_CONFIG, value);
    }

    /*
    i2c1.writeByte(PCF8591_ADDR, CMD_ACCESS_CONFIG, value, function (e) {
       if(e){
           toLog('Error in writeDAC() -> writeByte')
       }
    });
    */
}
