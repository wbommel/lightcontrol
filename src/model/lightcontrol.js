'use strict'

let logger
let conf
let util

let _isInitialized = false



//callback functions until I know how to do it with events. To avoid circular referencing.
let _heartbeatCallBack      // should send a heartbeat to the clients



module.exports = {
    Init: function (diContainer) {
        logger = diContainer.logger
        conf = diContainer.conf
        util = diContainer.util

        _isInitialized = logger !== undefined && util !== undefined

        //enter  automatic mode
        setInterval(_automaticMode, 1000);

        return this
    },
    TestFunction: function () { logger.LogIt('received from outside...', logger.LogLevelInformation) },
    SetHeartbeatCallback: function (cb) { _heartbeatCallBack = cb }
}

function _automaticMode() {
    //send heartbeat to client eventually
    if (typeof (_heartbeatCallBack) === 'function') { _heartbeatCallBack() }
}

