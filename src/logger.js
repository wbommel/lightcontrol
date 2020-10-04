const util = require('util')

const useUnixTimeStampPrefix = true
const logMessages = true
const outputToConsole = true
const outputToCallback = true
const loggerCallbackFunction = null

module.exports = {
  UseUnixTimeStampPrefix: useUnixTimeStampPrefix,
  DoLogMessages: logMessages,
  OutputToConsole: outputToConsole,
  OutputToCallback: outputToCallback,
  LoggerCallbackFunction: loggerCallbackFunction,
  LogIt: function (Message) {
    if (!this.DoLogMessages) {
      return
    }

    if (outputToConsole) {
      this.ToConsole(Message)
    }

    if (outputToCallback && typeof this.LoggerCallbackFunction === 'function') {
      this.LoggerCallbackFunction({
        Message: buildMessage(Message, this.UseUnixTimeStampPrefix)
      })
    }
  },
  ToConsole: function (Message) {
    console.log(buildMessage(Message, this.UseUnixTimeStampPrefix))
  }

}

function buildMessage (Message, UseUnixTimeStampPrefix) {
  let prefix = ''

  if (UseUnixTimeStampPrefix) {
    const now = new Date(new Date().toLocaleString())
    const debugStamp = now / 1000
    prefix = util.format('[%d]\t', debugStamp)
  }

  return prefix + Message
}
