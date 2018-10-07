'use strict'

let logger
let conf
let websocket
let webservice
let util

let _isInitialized = false;



module.exports = {
    Init: function (diContainer) {
        logger = diContainer.logger
        conf = diContainer.conf
        websocket = diContainer.websocket
        webservice = diContainer.webservice
        util = diContainer.util

        _isInitialized = logger !== undefined && websocket !== undefined

        _createClientConnectListeners()
        return this
    },
    GetSocketHandlers: function () {
        return _clientHandlers
    }
}



function _createClientConnectListeners() {
    if (!_isInitialized) { return; }

    websocket.sockets.on('connection', (socket) => {
        logger.LogIt('client connected...', logger.LogLevelInformation)
        logger.LogIt('client id: ' + socket.id, logger.LogLevelInformation)
        logger.LogIt(util.format('client: %s', socket), logger.LogLevelInformation)
        logger.LogIt(util.format('handshake: %o', socket.handshake), logger.LogLevelInformation)


        socket.on('debugInfoChanged', (data) => {
            _clientListenerDebugInfoChanged(socket, data)
        })
        socket.on('disconnect', (reason) => {
            _clientListenerDisconnect(socket, reason)
        })





        webservice.LogConnectedClients()
    })
}



function _clientListenerDebugInfoChanged(sender, data) {
    logger.LogIt(util.format('Debug Info Changed received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _clientListenerDisconnect(sender, reason) {
    logger.LogIt(util.format('client "%s" disconnected. Reason: %s', sender.id, reason), logger.LogLevelInformation)
    webservice.LogConnectedClients()
}
