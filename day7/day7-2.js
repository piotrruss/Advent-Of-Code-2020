const data = require('./data')
const arrays = data
  .replace(/\n/g,"")
  .replace(/bag(s)?/g,"")
  .split('.').slice(0,-1)
  .map(s => s.split(' contain '))
  .map(s => [s[0].trim(), s.slice(1).map(x => x.trim().split(' , '))[0]])
  .map(s => [s[0], s[1].map(x => {
    if (x !== 'no other') {
      return[x.replace(/\d+/g, '').trim(), parseInt(x.match(/[0-9]+/g))]
    } else {
      return ['no other', 1]
    }})])
  .map(s => [s[0], s[1].filter(x => x !== null)])

let gold = arrays.find(s => s[0] === 'shiny gold')[1]
let parents = 0

gold.forEach(g => parents += g[1])

while (
  gold.map(g => g[0] !== 'no other').some(g => true)
) {
  gold = gold.map(g => {
    if (arrays.find(s => s[0] === g[0])) {
      return arrays.find(s => s[0] === g[0])[1].map(x => {
        if (x[0] != 'no other') {
          parents = parents + (x[1] * g[1])
        }
        return ([x[0], x[1] * g[1]])
      })
    } else { return [] }
  }).flat(1)
}

console.log(parents)

