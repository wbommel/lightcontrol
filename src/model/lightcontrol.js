'use strict'

let logger
let conf
let util

let _isInitialized = false



module.exports = {
    Init: function (diContainer) {
        logger = diContainer.logger
        conf = diContainer.conf
        util = diContainer.util

        _isInitialized = logger !== undefined && util !== undefined

        return this
    }
}



