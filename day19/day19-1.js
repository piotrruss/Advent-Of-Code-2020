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

find(rules[0], rules)
const regexp = new RegExp(`^${regexps[rules[0]]}$`)

let result = 0
messages.forEach(m => { if (regexp.test(m)) { result++ } })
console.log('Answer: ', result)

