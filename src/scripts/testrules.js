const conf = require('../config.json')
const TimeIsInRange = require('../model/rulevalidation').TimeIsInRange
const TodayIsInRuleRange = require('../model/rulevalidation').TodayIsInRuleRange
const TodayIsTheCorrectWeekday = require('../model/rulevalidation').TodayIsTheCorrectWeekday
const YearIsInRuleRange = require('../model/rulevalidation').YearIsInRuleRange

const filteredRules = []

for (const i in conf.rules) {
  const rule = conf.rules[i]

  if (!YearIsInRuleRange(rule)) { continue }
  if (!TodayIsInRuleRange(rule)) { continue }
  if (!TodayIsTheCorrectWeekday(rule)) { continue }
  if (!TimeIsInRange(rule)) { continue }

  filteredRules.push(rule)
}

console.log('filteredRules.Count: %s', filteredRules.length)
for (const i in filteredRules) {
  const r = filteredRules[i]
  console.log(r)
}

if (filteredRules.length > 1) {
  console.log('We need to filter further...')
}

/**
 * filter overlapping rules by priority
 *
 * @param {*} rules
 */
function prioritizeRules (rules) {

}
