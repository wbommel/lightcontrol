const util = require('util');

let useUnixTimeStampPrefix = true;
let logMessages = true;
let outputToConsole = true;
let outputToCallback = true;
let loggerCallbackFunction = null;



module.exports = {
    UseUnixTimeStampPrefix: useUnixTimeStampPrefix,
    DoLogMessages: logMessages,
    OutputToConsole: outputToConsole,
    OutputToCallback: outputToCallback,
    LoggerCallbackFunction: loggerCallbackFunction,
    LogIt: function (Message) {
        if (!this.DoLogMessages) {
            return;
        }

        if (outputToConsole) {
            this.ToConsole(Message);
        }

        if (outputToCallback && typeof this.LoggerCallbackFunction === "function") {
            this.LoggerCallbackFunction({
                Message: buildMessage(Message, this.UseUnixTimeStampPrefix)
            });
        }
    },
    ToConsole: function (Message) {
        console.log(buildMessage(Message, this.UseUnixTimeStampPrefix));
    },



};



function buildMessage(Message, UseUnixTimeStampPrefix) {
    let prefix = '';

    if (UseUnixTimeStampPrefix) {
        let now = new Date(new Date().toLocaleString());
        let debugStamp = now / 1000;
        prefix = util.format('[%d]\t', debugStamp);
    }

    return prefix + Message;
}
