﻿var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , conf = require('./config.json')
    , dbaccess = require('./model/dbaccess')
    , calculations = require('./model/calculations')
    , util = require('util');



server.listen(conf.port);



// statische Dateien ausliefern
app.use(express.static(__dirname + '/public'));



// wenn der Pfad / aufgerufen wird
app.get('/', function (req, res) {
    // so wird die Datei index.html ausgegeben
    res.sendfile(__dirname + '/public/index.html');
});



/**
 * global declarations
 */
var currentRule; //create minimal rule stub



io.sockets.on('connection', function (socket) {

    // der Client ist verbunden
    socket.emit('chat', {zeit: new Date(), text: 'Du bist nun mit dem Server verbunden!'});

    // wenn ein Benutzer einen Text senden
    socket.on('chat', function (data) {
        // so wird dieser Text an alle anderen Benutzer gesendet
        io.sockets.emit('chat', {zeit: new Date(), name: data.name || 'Anonym', text: data.text});
    });


    socket.on('webtest', function (data) {
        // console.log('content requested...');
        // console.log('Data: ' + data.toString());
        socket.emit('contentsent', {destination: 'dest', content: '<H1>YEAH! it works</H1>'});
    });



    /**
     * automatic mode
     */
    setInterval(_automaticMode, 1000);

    var firstRun = true;

    /**
     * automatic mode function
     * @private
     */
    function _automaticMode() {
        var now = new Date(new Date().toLocaleString());
        var modulus = ((now / 1000) % 5);

        //check for rules every 5 seconds
        if (modulus === 0 || firstRun) {
            if (firstRun) {
                firstRun = false;
            }
            dbaccess.GetAplyingRule(function (rule) {
                    console.log('function called');
                    currentRule = rule;
                }
            )
        }

        //get dimValue
        var dimValue = calculations.CalcDimValueByRule(currentRule);
        console.log('DimValue: %d', dimValue);



        console.log('Time: %d, (%s)', now, now);
        console.log('Modulus: %d', modulus);

        if (currentRule) {
            //console.log('%o', currentRule);
            console.log('active rule = rule.id: %d   rule.Priority: %d   rule.From: %s   rule.To: %s', currentRule.id, currentRule.Priority, currentRule.From, currentRule.To);


            /**
             * testing from and to by date value including dimtime
             * @type {Date}
             */
            var from = new Date(new Date().toLocaleString());
            var to = new Date(new Date().toLocaleString());
            from.setHours(parseInt(currentRule.From.split(';')[3]));
            from.setMinutes(parseInt(currentRule.From.split(';')[4]));
            from.setSeconds(0);
            from.setMilliseconds(0);
            to.setHours(parseInt(currentRule.To.split(';')[3]));
            to.setMinutes(parseInt(currentRule.To.split(';')[4]) + currentRule.DimTime);
            to.setSeconds(0);
            to.setMilliseconds(0);
            //console.log('jetzt   : %s', jetzt);
            //console.log('from    : %s', from);
            //console.log('to      : %s', to);
            //console.log('InRange : %s', jetzt >= from && jetzt <= to);
            /**/



            // message to client
            var message =
                util.format('Current Time--: (%d) %s<br/>', now, now) +
                util.format('Rule From Time: (%d) %s<br/>', from, from) +
                util.format('Rule To Time--: (%d) %s<br/>', to, to) +
                util.format('%o<br/>', currentRule) +
                util.format('Dim-Value-----: %d<br/>', dimValue);

            socket.emit('contentsent', {
                destination: 'rule',
                content: message
            });
        } else {
            socket.emit('contentsent', {
                destination: 'rule',
                content: util.format('No rule active. Dim-Value: %d<br/>', dimValue)
            });
        }
    }


});

//on ctrl+c
process.on('SIGINT', function () {
    // LED.writeSync(0); // Turn LED off
    // LED.unexport(); // Unexport LED GPIO to free resources
    // pushButton.unexport(); // Unexport Button GPIO to free resources
    process.exit(); //exit completely
});



// Portnummer in die Konsole schreiben
console.log('Der Server läuft nun unter http://127.0.0.1:' + conf.port + '/');
