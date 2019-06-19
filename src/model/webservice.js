'use strict'

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
let _isInitialized = false



module.exports = {
    Init: function (diContainer) {
        express = diContainer.express
        webApp = diContainer.app
        webServer = diContainer.server
        webSocket = diContainer.websocket
        util = diContainer.util
        logger = diContainer.logger

        logger.LoggerCallbackFunction = _sendLogMessage

        _isInitialized = express !== undefined && webApp !== undefined && webServer !== undefined && webSocket !== undefined && util !== undefined && logger !== undefined

        _createClientConnectListeners()

        return this
    },
    StartServer: function (portNumber) {
        _startServer(portNumber)
    },
    LogConnectedClients: function () {
        _logConnectedClients()
    },
    SendHeartBeat: function () {
        _sendHeartbeat()
    }
}



function _sendToClients(callback) {
    if (! typeof callback === 'function' || !_isInitialized) { return }

    webSocket.sockets.clients(function (error, clients) {
        clients.forEach(function (item, index) {
            callback(webSocket.sockets.connected[item])
        })
    })
}

/**
 * 
 */
let _sendHeartbeat = function (socket) {
    _sendToClients(function (socket) {
        socket.emit('heartbeat', {})
    })
}

/**
 * 
 */
let _sendLogMessage = function (data) {
    _sendToClients(function (socket) {
        socket.emit('debugLogMessage', { Message: data.Message })
    })
}

/**
 * 
 * @param {*} portNumber 
 */
function _startServer(portNumber) {
    if (!_isInitialized) { return; }

    //start up web server
    webServer.listen(portNumber)

    //statische Dateien ausliefern
    webApp.use(express.static(__dirname + '/../public'));

    //webApp.get('/', function (req, res) {
    webApp.all('/', function (req, res) {
        // wenn der Pfad / aufgerufen wird
        // so wird die Datei index.html ausgegeben
        res.sendfile(__dirname + '../public/index.html')

        next()
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


        socket.on('disconnect', (reason) => { _clientListenerDisconnect(socket, reason) })
        socket.on('SendLogToClient_Toggle', (data) => { _clientListenerSendLogToClient_Toggle(socket, data) })
        socket.on('SendLogToClient_On', (data) => { _clientListenerSendLogToClient_On(socket, data) })
        socket.on('SendLogToClient_Off', (data) => { _clientListenerSendLogToClient_Off(socket, data) })
        socket.on('AutomaticMode_Toggle', (data) => { _clientListenerAutomaticMode_Toggle(socket, data) })
        socket.on('AutomaticMode_On', (data) => { _clientListenerAutomaticMode_On(socket, data) })
        socket.on('AutomaticMode_Off', (data) => { _clientListenerAutomaticMode_Off(socket, data) })
        socket.on('ManualValue_Changed', (data) => { _clientListenerManualValue_Changed(socket, data) })
        socket.on('ManualValue_100', (data) => { _clientListenerManualValue_100(socket, data) })
        socket.on('ManualValue_0', (data) => { _clientListenerManualValue_0(socket, data) })

        socket.on('', (data) => { })

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



function _clientListenerDisconnect(sender, reason) {
    logger.LogIt(util.format('client "%s" disconnected. Reason: %s', sender.id, reason), logger.LogLevelInformation)
    _logConnectedClients()
}

function _clientListenerSendLogToClient_Toggle(sender, data) {
    logger.LogIt(util.format('SendLogToClient_Toggle received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _clientListenerSendLogToClient_On(sender, data) {
    logger.LogIt(util.format('SendLogToClient_On received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _clientListenerSendLogToClient_Off(sender, data) {
    logger.LogIt(util.format('SendLogToClient_Off received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _clientListenerAutomaticMode_Toggle(sender, data) {
    logger.LogIt(util.format('AutomaticMode_Toggle received from client "%s"', sender.id), logger.LogLevelInformation)
    lightcontrol.TestFunction()
}

function _clientListenerAutomaticMode_On(sender, data) {
    logger.LogIt(util.format('AutomaticMode_On received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _clientListenerAutomaticMode_Off(sender, data) {
    logger.LogIt(util.format('AutomaticMode_Off received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _clientListenerManualValue_Changed(sender, data) {
    logger.LogIt(util.format('ManualValue_Changed received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _clientListenerManualValue_100(sender, data) {
    logger.LogIt(util.format('ManualValue_100 received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _clientListenerManualValue_0(sender, data) {
    logger.LogIt(util.format('ManualValue_0 received from client "%s"', sender.id), logger.LogLevelInformation)
}






