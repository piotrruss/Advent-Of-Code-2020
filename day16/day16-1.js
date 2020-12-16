const data = require('./data')
const invalid = []
const ranges = data
  .split('\nyour ticket:')[0]
  .split(/\n/g)
  .filter(r => r)
  .map(r => ({[r.split(': ')[0]]: r.split(': ')[1].split(' or ').map(s => s.split('-').map(a => parseInt(a)))}))
  .reduce((c, n) => ({ ...c, ...n}), {})

const your = data
  .split('your ticket:\n')[1]
  .split('nearby tickets:\n')[0]
  .split(',')
  .map(n => parseInt(n.replace(/\n/g,'')))

const nearby = data
  .split('nearby tickets:\n')[1]
  .split(/\n/g)
  .filter(n => n)
  .map(n => n.split(',').map(nr => parseInt(nr)))
  .filter(n => n.every(nr => {
    const check = Object.values(ranges).some(r => r.some(ra => nr >= ra[0] && nr <= ra[1] ))
    if (!check) { invalid.push(nr) }
    return check
  }))

console.log('Answer: ', invalid.reduce((a, b) => a + b, 0))

