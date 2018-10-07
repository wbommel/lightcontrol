/**
 * requirements
 */
let express
let webApp
let webServer
let webSocket
let util



/**
 * global declarations
 */
let logger
let isInitialized = false



module.exports = {
    Init: function (diContainer) {
        express = diContainer.express
        webApp = diContainer.app
        webServer = diContainer.server
        webSocket = diContainer.websocket
        util = diContainer.util
        logger = diContainer.logger

        isInitialized = express !== undefined && webApp !== undefined && webServer !== undefined && logger !== undefined
        return this
    },
    StartServer: function (portNumber) {
        _startServer(portNumber)
    },
    LogConnectedClients: function () {
        _logConnectedClients()
    }
}



/**
 * 
 */
function _startServer(portNumber) {
    //start up web server
    webServer.listen(portNumber)

    //statische Dateien ausliefern
    webApp.use(express.static(__dirname + '/../public'));

    webApp.get('/', function (req, res) {
        // wenn der Pfad / aufgerufen wird
        // so wird die Datei index.html ausgegeben
        res.sendfile(__dirname + '../public/index.html')
    });

    // Portnummer in die Konsole schreiben
    _toLogger('Der Server läuft nun unter http://127.0.0.1:' + portNumber + '/', logger.LogLevelStatus + logger.LogLevelInformation)
}

/**
 * 
 */
function _logConnectedClients() {
    webSocket.sockets.clients(function (error, clients) {
        if (error || clients.length === 0) { logger.LogIt(util.format('no clients'), logger.LogLevelInformation) }

        clients.forEach(function (item, index) {
            logger.LogIt(util.format('client %d: %s', ++index, item), logger.LogLevelInformation)
        })

    })
}

/**
 * logs everything to the logger callback function if exists
 * wrapper of the callback delegate
 * @param {*} message
 * @param {*} level 
 */
function _toLogger(message, level) {
    if (logger) {
        logger.LogIt(message, level)
    }
}
