'use strict'

let conf
let logger

const main = {}

main.prototype.init = (modConfig, modLogger) => {
  conf = modConfig
  logger = modLogger
}

export default main
