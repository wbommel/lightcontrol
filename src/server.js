var express = require('express')
    , app = express()
    , server = require('http').createServer(app)
    , io = require('socket.io').listen(server)
    , conf = require('./config.json');

var mod = require('./model.js');
mod.ReadRule();

var dataModel = require('./model/datamodel.js');

var dbaccess = require('./model/dbaccess');

server.listen(conf.port);

// statische Dateien ausliefern
app.use(express.static(__dirname + '/public'));

// wenn der Pfad / aufgerufen wird
app.get('/', function (req, res) {
    // so wird die Datei index.html ausgegeben
    res.sendfile(__dirname + '/public/index.html');
});

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
});

//on ctrl+c
process.on('SIGINT', function () {
    // LED.writeSync(0); // Turn LED off
    // LED.unexport(); // Unexport LED GPIO to free resources
    // pushButton.unexport(); // Unexport Button GPIO to free resources
    process.exit(); //exit completely
});


function test(data) {
    console.log(data);
}


// Portnummer in die Konsole schreiben
console.log('Der Server läuft nun unter http://127.0.0.1:' + conf.port + '/');


