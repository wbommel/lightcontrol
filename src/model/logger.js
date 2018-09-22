'use strict';

/**
 * requirements
 */
let util



/**
 * interface
 */
module.exports = {
    Init: function (diUtil, loggerFunc) {
        this.Util = diUtil
        util = diUtil

        //settings / defaults
        this.LogLevel = this.LogLevelError + this.LogLevelWarning + this.LogLevelInformation + this.LogLevelStatus
        this.UseUnixTimeStampPrefix = true
        this.DoLogMessages = true
        this.OutputToConsole = true
        this.OutputToCallback = true

        this.LoggerCallbackFunction = loggerFunc
        this.isInitialized = true
        
        return this
    },

    /**
     * log level constants
     */
    LogLevelError: Math.pow(2, 0),
    LogLevelWarning: Math.pow(2, 1),
    LogLevelInformation: Math.pow(2, 2),
    LogLevelStatus: Math.pow(2, 3),

    /**
     * members
     */
    LogIt: function (message, level) {
        if (!this.DoLogMessages) { return }

        this.ToConsole(message, level)
        this.ToCallback(message, level)
    },
    ToConsole: function (message, level) {
        if (!(this.LogLevel & level )) { return }

        if (this.OutputToConsole) {
            console.log(_buildMessage(message, this.UseUnixTimeStampPrefix))
        }
    },
    ToCallback: function (message, level) {
        if (!(this.LogLevel & level === level)) { return }

        if (this.OutputToCallback && typeof this.LoggerCallbackFunction === "function") {
            this.LoggerCallbackFunction({
                Message: _buildMessage(message, this.UseUnixTimeStampPrefix)
            });
        }
    },
};



/**********************************************************************************************************************
 * private functions
 *********************************************************************************************************************/
/**
 * _buildMessage
 * @param {*} message 
 * @param {*} useUnixTimeStampPrefix 
 */
function _buildMessage(message, useUnixTimeStampPrefix) {
    let prefix = '';

    if (useUnixTimeStampPrefix) {
        let now = new Date(new Date().toLocaleString());
        let debugStamp = now / 1000;
        prefix = util.format('[%d]\t', debugStamp);
    }

    return prefix + message;
}
