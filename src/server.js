/**
 * global requirements
 */
var express = require('express');                   // express library
var app = express();                                // express Application
var server = require('http').createServer(app);     // web server
var io = require('socket.io').listen(server);       // websocket
var conf = require('./config.json');                // configuration (server port etc)
var dbaccess = require('./model/dbaccess');         // database access stuff
var calculations = require('./model/calculations'); // calculations
var util = require('util');                         // string formatting etc
var fs = require('fs');                             // filesystem operations (for reading external html code i.e.
                                                    //      for rule editor popup



/**
 * constants
 */
const ledTrueValue = 0;
const ledFalseValue = 1;



/**
 * global variable declarations
 */

//create minimal rule stub and dimValue
var currentRule;
var dimValue = 0;

//database check interval
var databaseCheckInterval = 5;

//global debug switch
var showDebugInfoInConsole = true;

//global mode selector (default=1)
// 0 = manual mode
// 1 = automatic mode
var mode = 1;

//client refresh interval in ms
var refreshInterval = 1000;

//read external html data
var externalWebTest = fs.readFileSync('./public/webtest.html', 'UTF-8');

//manual lamp switch
var manualLampOn = false;

//LED switch value
var ledValue = ledFalseValue;

//all db light rules
var allLightRules;



/**
 * initialize hardware relevant stuff
 */
var Gpio;
var LED1;
var LED2;
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

var i2c;
var i2c1;
try {
    i2c = require('i2c-bus');	//package to communicate via i2c
    i2c1 = i2c.openSync(1);		//open i2c bus 1
    writeDAC(0);

    toLog('Created and initialized \'i2c-bus\' i2c1');
} catch (e) {
    toLog('Could not create \'i2c-bus\'...');
}
var PCF8591_ADDR = 0x48;		//adress of PCF8591 on i2c bus (i2cdetect -y 1)
var CMD_ACCESS_CONFIG = 0x41;	//'adress' of DAC in the PCF8591
var dacValue = 0;



/**
 * global initialisations
 */

//start up web server
server.listen(conf.port);

//statische Dateien ausliefern
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    // wenn der Pfad / aufgerufen wird
    // so wird die Datei index.html ausgegeben
    res.sendfile(__dirname + '/public/index.html');
});

if (showDebugInfoInConsole) {
    // Portnummer in die Konsole schreiben
    console.log('Der Server läuft nun unter http://127.0.0.1:' + conf.port + '/');
}

//enter  automatic mode
setInterval(_automaticMode, 1000);


/**********************************************************************************************************************
 * socket connect listeners                                                                                           *
 **********************************************************************************************************************/
//when a socket client connects
io.sockets.on('connection', function (socket) {

    //log to console when a client connects
    toLog('client connected');

    //initialize client
    socket.emit('client-initialize', {
        ClientRefreshInterval: refreshInterval,
        DatabaseCheckInterval: databaseCheckInterval,
        Mode: mode,
        ShowDebugInfoSwitch: showDebugInfoInConsole,
        CalculatedDimValue: dimValue,
        SocketId: socket.id,
        ManualLampOn: manualLampOn,
        ServerStatusMessage: 'not yet defined...'
    });

    //refresh clients every second or so
    setInterval(_clientRefresh, refreshInterval);



    //socket listeners *************************************************************************************************
    socket.on('debugInfoChanged', function (data) {
        showDebugInfoInConsole = data.ShowDebugInfoSwitch;
        toLog(util.format('emitted by client: debugInfoChanged = %s', data.ShowDebugInfoSwitch));
    });

    socket.on('toggleMode', function (data) {
        var modeOld = mode;
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

        //send server status
        var serverStatusMessage =
            util.format('ClientRefreshInterval: %dms', refreshInterval) + '<br/>' +
            util.format('DatabaseCheckInterval: %ds', databaseCheckInterval) + '<br/>' +
            util.format('Mode&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %d', mode) + '<br/>' +
            util.format('ShowDebugInfoSwitch&nbsp&nbsp: %s', showDebugInfoInConsole) + '<br/>' +
            util.format('CalculatedDimValue&nbsp&nbsp&nbsp: %d', dimValue) + '<br/>' +
            util.format('HardwareDimValue&nbsp&nbsp&nbsp&nbsp&nbsp: %d', dacValue) + '<br/>' +
            util.format('GpioValue&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %d', ledValue) + '<br/>' +
            util.format('socket.id&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', socket.id) + '<br/>' +
            util.format('ManualLampOn&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', manualLampOn) + '<br/>' +
            util.format('CurrentRule&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', currentRule ? util.format('rule: [id:%d, Priority:%d, From:\'%s\', To:\'%s\', DimTime:%d, Weekdays:%d]', currentRule.id, currentRule.Priority, currentRule.From, currentRule.To, currentRule.DimTime, currentRule.Weekdays) : 'null');
        socket.emit('server-status', {
            ClientRefreshInterval: refreshInterval,
            DatabaseCheckInterval: databaseCheckInterval,
            Mode: mode,
            ShowDebugInfoSwitch: showDebugInfoInConsole,
            CalculatedDimValue: dimValue,
            HardwareDimValue: dacValue,
            GpioValue: ledValue,
            SocketId: socket.id,
            ManualLampOn: manualLampOn,
            CurrentRule: currentRule,
            ServerStatusMessage: serverStatusMessage
        })
        ;

        //check if debug switch is on
        if (showDebugInfoInConsole) {
            var now = new Date(new Date().toLocaleString());

            // message to client
            var message =
                util.format('Current Time--: (%d) %s<br/>', now, now) +
                util.format('%o<br/>', currentRule) +
                util.format('Dim-Value-----: %d<br/>', dimValue) +
                util.format('Debug-Switch--: %s<br/>', showDebugInfoInConsole);
        }
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
var firstRun = true; //indicate first iteration
function _automaticMode() {

    //check mode first
    if (mode === 0) { // Manual mode
        if (currentRule) {
            currentRule = null;
        }
    }
    else if (mode === 1) { //Automatic mode
        var now = new Date(new Date().toLocaleString());
        var modulus = ((now / 1000) % databaseCheckInterval);

        //check for rules every 5 seconds
        if (modulus === 0 || firstRun) {
            if (firstRun) {
                firstRun = false;
            }
            dbaccess.GetAplyingRule(function (rules, rule) {
                    toLog('\tcheck database for rules...');
                    currentRule = rule;

                    allLightRules = [];
                    for (var i in rules) {
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

        //if (currentRule) {
            //get dimValue
            dimValue = calculations.CalcDimValueByRule(currentRule);

            //write to hardware
            setHardware();
        //}
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
    if (showDebugInfoInConsole) {
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
    if (showDebugInfoInConsole) {
        var now = new Date(new Date().toLocaleString());
        var debugStamp = now / 1000;

        console.log('[%d]\t' + Message, debugStamp);
    }
}



/**
 *
 */
function setHardware() {
    if (i2c1 && LED1 && LED2) {
        manualLampOn = dimValue > 0;
        ledValue = manualLampOn ? ledTrueValue : ledFalseValue;

        toLog(util.format('\t\tledValue: %d', ledValue));

//        LED1.writeSync(ledValue);
//        LED2.writeSync(ledValue);

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
