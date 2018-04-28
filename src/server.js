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


/**
 * socket listeners
 */
//when a socket client connects
io.sockets.on('connection', function (socket) {

    //log to console when a client connects
    if (showDebugInfoInConsole) {
        console.log('client connected');
    }

    //initialize client
    socket.emit('client-initialize', {
        Mode: mode,
        ShowDebugInfoSwitch: showDebugInfoInConsole
    });

    //refresh clients every second or so
    setInterval(_clientRefresh, refreshInterval);


    //socket listeners *************************************************************************************************
    socket.on('debugInfoChanged', function (data) {
        showDebugInfoInConsole = data.ShowDebugInfoSwitch;
        if (showDebugInfoInConsole) {
            console.log('emitted by client: debugInfoChanged = %s', data.ShowDebugInfoSwitch);
        }
    });


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
            util.format('socket.id&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp: %s', socket.id);
        socket.emit('server-status', {
            ClientRefreshInterval: refreshInterval,
            DatabaseCheckInterval: databaseCheckInterval,
            Mode: mode,
            ShowDebugInfoSwitch: showDebugInfoInConsole,
            CurrentDimValue: dimValue,
            ServerStatusMessage: serverStatusMessage
        });

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

    var now = new Date(new Date().toLocaleString());
    var modulus = ((now / 1000) % databaseCheckInterval);
    var debugStamp = now / 1000;

    //check for rules every 5 seconds
    if (modulus === 0 || firstRun) {
        if (firstRun) {
            firstRun = false;
        }
        dbaccess.GetAplyingRule(function (rule) {
                if (showDebugInfoInConsole) {
                    console.log('[%d] check database for rules...', debugStamp);
                }
                currentRule = rule;
            }
        )
    }

    //get dimValue
    dimValue = calculations.CalcDimValueByRule(currentRule);

    //debugging ****************************
    if (showDebugInfoInConsole) {
        //show current light rule
        console.log('[%d] current light rule:', debugStamp);
        if (currentRule) {
            console.log('[%d] \trule: [id:%d,Priority:%d,From:\'%s\',To:\'%s\',DimTime:%d,Weekdays:%d]', debugStamp, currentRule.id, currentRule.Priority, currentRule.From, currentRule.To, currentRule.DimTime, currentRule.Weekdays);
        }
        console.log('[%d] \tdimValue: %d', debugStamp, dimValue);

        //check connected client info
        console.log('[%d] connected clients:', debugStamp);
        io.sockets.clients(function (error, clients) {
            if (error) throw error;

            clients.forEach(function (item, index) {
                console.log('[%d] \tclient %d: %s', debugStamp, ++index, item);
            })
        });
    }
}


