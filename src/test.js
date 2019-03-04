const conf = require('./config.json');                // configuration (server port etc)

for (let i in conf.rules) {
    let rule = conf.rules[i]
    console.log(rule.From)
}