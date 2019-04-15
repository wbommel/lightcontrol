
//Old tries (no real tests):
/*
const util = require('util')
let moduleLogger = require('../model/logger.js')
let logger = Object.create(moduleLogger).Init(util)

console.log('LogLevel: ' + logger.LogLevel)

//logger.SetLogLevel(logger.LogLevelError)
logger.LogLevel = logger.LogLevelError

console.log('LogLevel: ' + logger.LogLevel)

logger.LogIt("TestError", logger.LogLevelError)
logger.LogIt("TestWarning", logger.LogLevelWarning)
logger.LogIt("TestInformation", logger.LogLevelInformation)
logger.LogIt('TestStatus', logger.LogLevelStatus)


console.log('second try: set loglevel to information and try over...')
console.log('LogLevel: ' + logger.LogLevel)

logger.LogLevel = logger.LogLevel + logger.LogLevelInformation

console.log('LogLevel: ' + logger.LogLevel)

logger.LogIt("TestError", logger.LogLevelError)
logger.LogIt("TestWarning", logger.LogLevelWarning)
logger.LogIt("TestInformation", logger.LogLevelInformation)
logger.LogIt('TestStatus', logger.LogLevelStatus)

console.log(4 & 1)
console.log(5 & 1)
console.log(6 & 1)

*/
