/**
 * requirements
 */
let express
let webApp
let webServer
let socketIo



/**
 * global declarations
 */
let loggerCallback
let isInitialized = false



module.exports = {
    Init: function (diExpress, diWebApp, diWebServer, diSocketIo, loggerFunc) {
        express = diExpress
        webApp = diWebApp
        webServer = diWebServer
        socketIo = diSocketIo
        loggerCallback = loggerFunc
        isInitialized = true
        return this
    },
    StartServer: function (portNumber) { _startServer(portNumber) }
}



/**
 * 
 */
function _startServer(portNumber) {
    //start up web server
    webServer.listen(portNumber);

    //statische Dateien ausliefern
    webApp.use(express.static(__dirname + '../public'));

    webApp.get('/', function (req, res) {
        // wenn der Pfad / aufgerufen wird
        // so wird die Datei index.html ausgegeben
        res.sendfile(__dirname + '../public/index.html');
    });

    // Portnummer in die Konsole schreiben
    _toLogger('Der Server läuft nun unter http://127.0.0.1:' + portNumber + '/');
}

/**
 * logs everything to the logger callback function if exists
 * wrapper of the callback delegate
 * @param {*} message
 */
function _toLogger(message) {
    if (typeof loggerCallback === 'function') {
        loggerCallback(message)
    }
}
