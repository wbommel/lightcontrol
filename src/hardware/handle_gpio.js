'use strict'

module.exports = {
  Conf: null,
  Logger: null,
  Relay1: null,
  Relay2: null,
  ButtonAutomatic: null,
  Button100percent: null,
  Button0percent: null,

  Init: (modConfig, modLogger) => {
    this.Conf = modConfig
    this.Logger = modLogger

    const Gpio = require('onoff').Gpio
    this.Relay1 = new Gpio(23, 'out')
    this.Relay2 = new Gpio(24, 'out')
    this.ButtonAutomatic = new Gpio(4, 'in', 'both')
    this.Button100percent = new Gpio(17, 'in', 'both')
    this.Button0percent = new Gpio(27, 'in', 'both')

    return this
  },
 
  Relay1On: () => {
if(this.Relay1.readSync()!== 0){
  this.Relay1.writeSync(0)
}
  }

}
ier
