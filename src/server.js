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

//all db light rules
var allLightRules;


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
        CurrentDimValue: dimValue,
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
        }
        toLog(util.format('Mode toggled by client from %d to %d.', modeOld, mode));
    });

    socket.on('manualSliderValueChanged', function (data) {
        dimValue = data.SliderValue;
        toLog(util.format('\tslider.value: %d', data.SliderValue));
    });

    socket.on('manualToggleLampOnOff', function (data) {
        manualLampOn = !manualLampOn;
        toLog('\tLamp switched...');
    });

    socket.on('getLightrulesData', function (data) {
        socket.emit('returnLightrulesData', {
            AllRules: allLightRules
        });
    });
    //socket listeners *************************************************************************************************



    // socket dependant function declarations **************************************************************************
    /**
     * refreshes the connected
     * @private
     */
    function _clientRefresh() {

        //send server status
        var serverStatusMessage =
            util.format('ClientRefreshInterval: %dms', refreshInterval) + '<br/>' +
            util.format('DatabaseCheckInterval: %ds', databaseCheckInterval) + '<br/>' +
            util.format('Mode&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %d', mode) + '<br/>' +
            util.format('ShowDebugInfoSwitch&nbsp&nbsp: %s', showDebugInfoInConsole) + '<br/>' +
            util.format('CurrentDimValue&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %d', dimValue) + '<br/>' +
            util.format('socket.id&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', socket.id) + '<br/>' +
            util.format('ManualLampOn&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', manualLampOn);
        socket.emit('server-status', {
            ClientRefreshInterval: refreshInterval,
            DatabaseCheckInterval: databaseCheckInterval,
            Mode: mode,
            ShowDebugInfoSwitch: showDebugInfoInConsole,
            CurrentDimValue: dimValue,
            SocketId: socket.id,
            ManualLampOn: manualLampOn,
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
        var debugStamp = now / 1000;

        //check for rules every 5 seconds
        if (modulus === 0 || firstRun) {
            if (firstRun) {
                firstRun = false;
            }
            dbaccess.GetAplyingRule(function (rules, rule) {
                    toLog('\tcheck database for rules...');
                    currentRule = rule;
                    //toLog(util.format('\trules: %o', rules));

                    allLightRules = [];
                    for (var i in rules) {
                        //toLog(util.format('\tsingleRule: %o', rules[i]));
                        allLightRules.push({
                            id: rules[i].id,
                            Priority: rules[i].Priority,
                            From: rules[i].From,
                            To: rules[i].To,
                            DimTime: rules[i].DimTime,
                            Weekdays: rules[i].Weekdays
                        });
                    }

                    /*
                    rulesLength = rules.length;
                    for (i = 0; i < rulesLength; i++) {
                        toLog(util.format('rules[%d].RowDataPacket: %o', i, rules[i][i]));
                        allLightRules.push(rules[i]);
                    }*/
                    //allLightRules = rules;
                }
            )
        }

        if (currentRule) {
            //get dimValue
            dimValue = calculations.CalcDimValueByRule(currentRule);
        }
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
