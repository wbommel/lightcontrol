'use strict'

let logger
let conf
let websocket
let util

let _isInitialized = false;

module.exports = {
    Init: function (diContainer) {
        logger = diContainer.logger
        conf = diContainer.conf
        websocket = diContainer.websocket
        util = diContainer.util

        _isInitialized = logger !== undefined && websocket !== undefined

        _createSocketListeners()
        return this
    },
    GetSocketHandlers: function () {
        return socketHandlers
    }
}



function createSocketHandler() {
    return {
        Init: function (socket) {
            this.socket = socket
            _registerSocketListeners(socket)

            return this
        }
    };
}
let socketHandlers = []


function _createSocketListeners() {
    if (!_isInitialized) { return; }

    websocket.sockets.on('connection', (socket) => {
        let socketHandler = createSocketHandler().Init(socket)
        socketHandlers.push(socketHandler)

        logger.LogIt('client connected...', logger.LogLevelInformation)
        logger.LogIt('client id: ' + socket.id, logger.LogLevelInformation)
        logger.LogIt(util.format('client: %s', socket), logger.LogLevelInformation)
        logger.LogIt(util.format('handshake: %o', socket.handshake), logger.LogLevelInformation)
    })
}

function _registerSocketListeners(socket) {
    socket.on('debugInfoChanged', (data) => {
        _socketListenerDebugInfoChanged(socket, data)
    })
    socket.on('disconnect', (reason) => {
        _socketListenerDisconnect(socket, reason)
    })
}



function _socketListenerDebugInfoChanged(sender, data) {
    logger.LogIt(util.format('Debug Info Changed received from client "%s"', sender.id), logger.LogLevelInformation)
}

function _socketListenerDisconnect(sender, reason) {
    logger.LogIt(util.format('client "%s" disconnected. Reason: %s', sender.id, reason), logger.LogLevelInformation)

    //TODO: remove sender from array by array.splice?
}
//TODO: renamings to make clearer which function is doing what exactly