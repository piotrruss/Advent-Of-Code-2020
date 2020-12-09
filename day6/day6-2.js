const data = require('./data')

const repeats = data
  .split(/\n{2,}/g)
  .map(g => g.replace(/(^\n)|(\n$)/g,'').split('\n').map(s => s.split('')))
  .map(g => g[0].map(s => g.every(a => a.includes(s))).filter(x => x === true).length)
  .reduce((a, b) => a + b, 0)

console.log(repeats)
