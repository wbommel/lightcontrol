'use strict'
const logger = require('../logger')
const conf = require('../config.json')

const lcgpio = require('./handle_gpio').Init(conf, logger)
