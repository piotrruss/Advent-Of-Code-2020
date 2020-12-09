const data = require('./data')

const repeats = data
  .split(/\n{2,}/g)
  .map(g => g.replace(/(^\n)|(\n$)/g,'').split('\n').map(s => s.split('')).flat())
  .map(a => [...new Set(a)].length)
  .reduce((a, b) => a + b, 0)

console.log(repeats)
