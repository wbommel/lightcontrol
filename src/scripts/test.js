const conf = require('../config.json') // configuration (server port etc)

for (const i in conf.rules) {
  const rule = conf.rules[i]
  console.log(rule.From)
}

console.log('0x48: ' + parseInt('0x48', 16))
