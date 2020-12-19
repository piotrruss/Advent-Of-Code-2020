const data = require('./data')
const rules = {}, regexps = {}
const [unorderedRules, messages] = data.split('\n\n').map(l => l.split(/\n/g).filter(Boolean))
unorderedRules.forEach(r => rules[r.split(': ')[0]] = r.split(': ')[1])

const find = (rule, rules) => {
  if (rule in regexps) { return regexps[rule] }

  let newRule = ''
  if (/^".*"$/.test(rule)) {
    newRule = rule.replace(/"/g, '')
  } else if (/\|/.test(rule)) {
    const [r1, r2] = rule.split(' | ')
    newRule = `(${find(r1, rules)}|${find(r2, rules)})`
  } else {
    newRule = rule.split(' ').map(nr => find(rules[nr], rules)).join('')
  }
  regexps[rule] = newRule
  return newRule
}

rules['8'] = '42 | 42 8'
rules['11'] = '42 31 | 42 11 31'

find(rules[42], rules)
find(rules[31], rules)
const regexp42 = new RegExp(regexps[rules[42]], 'g')
const regexp31 = new RegExp(regexps[rules[31]], 'g')
const customRegexp = new RegExp(`^(?<g42>(${regexps[rules[42]]})+)(?<g31>(${regexps[rules[31]]})+)$`)

let result = 0
messages.forEach(m => {
  const matches = customRegexp.exec(m)
  if (matches) {
    const res42 = matches.groups.g42.match(regexp42).length
    const res31 = matches.groups.g31.match(regexp31).length
    if (res42 > res31) { result++ }
  }
})

console.log('Answer: ', result)

