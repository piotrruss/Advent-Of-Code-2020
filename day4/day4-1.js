const data = require('./data')
const req = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
const valid = data
  .replace(/\n\r/g, "\n")
  .split(/\n{2,}/g)
  .map(s => s.replace(/\n/g,"").split(' '))
  .map(a => a.filter(Boolean))
  .map(a => a.map(s => s.split(':')))
  .map(o => req.every(r => o.map(o => o[0]).includes(r)))
  .filter(v => v === true).length

console.log(valid)
