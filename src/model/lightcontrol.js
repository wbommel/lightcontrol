'use strict'

let logger
let websocket

let _isInitialized = false;

module.exports = {
    Init: function (diContainer) {
        logger = diContainer.logger
        websocket = diContainer.websocket

        _isInitialized = logger !== undefined && websocket !== undefined

        _createSocketListeners()
        return this
    },
}

function _createSocketListeners() {
    if (!_isInitialized) { return; }

    websocket.sockets.on('connection', () => {
        logger.LogIt('client connected...', logger.LogLevelInformation)
    })
}