'use strict'

/**
 * requirements
 */
let express
let webApp
let webServer
let webSocket
let util
let lightcontrol



/**
 * global declarations
 */
let logger
let _isInitialized = false



module.exports = {
    Init: function (diContainer) {
        express = diContainer.express
        webApp = diContainer.app
        webServer = diContainer.server
        webSocket = diContainer.websocket
        util = diContainer.util
        lightcontrol = diContainer.lightcontrol
        logger = diContainer.logger

        _isInitialized = express !== undefined && webApp !== undefined && webServer !== undefined && webSocket !== undefined && util !== undefined && lightcontrol !== undefined && logger !== undefined

        _createClientConnectListeners()

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
    if (!_isInitialized) { return; }

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
    logger.LogIt('Der Server läuft nun unter http://127.0.0.1:' + portNumber + '/', logger.LogLevelStatus + logger.LogLevelInformation)
}

/**
 * 
 */
function _logConnectedClients() {
    if (!_isInitialized) { return; }

    webSocket.sockets.clients(function (error, clients) {
        if (error || clients.length === 0) { logger.LogIt(util.format('no clients'), logger.LogLevelInformation) }

        clients.forEach(function (item, index) {
            logger.LogIt(util.format('client %d: %s', ++index, item), logger.LogLevelInformation)
        })

    })
}



/******************************************************************************
 * socket handling 
 ******************************************************************************/
function _createClientConnectListeners() {
    if (!_isInitialized) { return; }

    webSocket.sockets.on('connection', (socket) => {
        logger.LogIt('client connected...', logger.LogLevelInformation)
        logger.LogIt('client id: ' + socket.id, logger.LogLevelInformation)
        logger.LogIt(util.format('client: %s', socket), logger.LogLevelInformation)
        logger.LogIt(util.format('handshake: %o', socket.handshake), logger.LogLevelInformation)


        socket.on('SendLogToClient_Toggle', (data) => { _clientListenerSendLogToClient_Toggle(socket, data) })
        socket.on('SendLogToClient_On', (data) => { })
        socket.on('SendLogToClient_Off', (data) => { })
        socket.on('AutomaticMode_Toggle', (data) => { })
        socket.on('AutomaticMode_On', (data) => { })
        socket.on('AutomaticMode_Off', (data) => { })

        socket.on('', (data) => { })

        socket.on('disconnect', (reason) => {
            _clientListenerDisconnect(socket, reason)
        })

        _logConnectedClients()
    })
}
/**
 * socket.on decriptions
 * 
 * - disconnect
 * 
 * - SendLogToClient_Toggle
 * - SendLogToClient_On
 * - SendLogToClient_Off
 * - AutomaticMode_Toggle
 * - AutomaticMode_On
 * - AutomaticMode_Off
 * - ManualValue_Changed
 * - ManualValue_100
 * - ManualValue_0
 * 
 * 
 * 
 * socket.emit descriptions
 * 
 */



function _clientListenerSendLogToClient_Toggle(sender, data) {
    logger.LogIt(util.format('SendLogToClient_Toggle received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _clientListenerDisconnect(sender, reason) {
    logger.LogIt(util.format('client "%s" disconnected. Reason: %s', sender.id, reason), logger.LogLevelInformation)
    _logConnectedClients()
}





