'use strict'

/**
 * requirements
 */
let conf
let websocket
let webservice



/**
 * global declarations
 */
let logger
let _isInitialized = false



module.exports = {
    Init: function (diContainer) {
        logger = diContainer.logger
        conf = diContainer.conf
        websocket = diContainer.websocket
        webservice = diContainer.webservice

        _isInitialized = logger !== undefined && conf !== undefined && websocket !== undefined && webservice !== undefined

        _createClientConnectListeners()

        return this
    }
}



/******************************************************************************
 * socket handling 
 ******************************************************************************/
function _createClientConnectListeners() {
    if (!_isInitialized) { return; }

    websocket.sockets.on('connection', (socket) => {
        logger.LogIt('     config editor (maybe?!) connected...', logger.LogLevelInformation)
        logger.LogIt('           client id: ' + socket.id, logger.LogLevelInformation)

        websocket.emit('initialize_config_editor', conf)
    })

    websocket.on('test123', function (data) {

    })
}
