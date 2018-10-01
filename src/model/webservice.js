/**
 * requirements
 */
let express
let webApp
let webServer



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
        logger = diContainer.logger

        isInitialized = express !== undefined && webApp !== undefined && webServer !== undefined && logger !== undefined
        return this
    },
    StartServer: function (portNumber) {
        _startServer(portNumber)
        logger.LogIt('Hooray...')
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
