const data = require('./data')
const rules = (o) => {
  switch(o[0]) {
    case 'byr':
      return parseInt(o[1]) >= 1920 && parseInt(o[1]) <= 2002 ? o[0] : false
    case 'iyr':
      return parseInt(o[1]) >= 2010 && parseInt(o[1]) <= 2020 ? o[0] : false
    case 'eyr':
      return parseInt(o[1]) >= 2020 && parseInt(o[1]) <= 2030 ? o[0] : false
    case 'hgt':
      if (o[1].indexOf('cm') > -1) {
        const h = parseInt(o[1].replace('cm',''))
        if (h >= 150 && h <= 193) return o[0]
      } else if (o[1].indexOf('in') > -1) {
        const h = parseInt(o[1].replace('in',''))
        if (h >= 59 && h <= 76) return o[0]
      }
      return false
    case 'hcl':
      return /#([a-f]|[A-F]|[0-9]){6}\b/.test(o[1]) ? o[0] : false
    case 'ecl':
      return ['amb','blu','brn','gry','grn','hzl','oth'].includes(o[1]) ? o[0] : false
    case 'pid':
      return /^\d{9}$/.test(o[1]) ? o[0] : false
    default:
      return false
  }
}

const req = ['byr','iyr','eyr','hgt','hcl','ecl','pid']
const valid = data
  .replace(/\n\r/g, "\n")
  .split(/\n{2,}/g)
  .map(s => s.replace(/\n/g,"").split(' '))
  .map(a => a.filter(Boolean))
  .map(a => a.map(s => s.split(':')))
  .map(o => req.every(r => o.map(rules).includes(r)))
  .filter(v => v === true)
  .length

console.log(valid)
