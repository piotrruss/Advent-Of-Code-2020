const data = require('./data')

let arrays = data
  .replace(/\n/g,"")
  .replace(/bag(s)?/g,"")
  .split('.')
  .slice(0,-1)
  .map(s => s.split(' contain '))
  .map(s => [s[0].trim(), s.slice(1).map(x => x.trim().split(' , '))[0]])
  .map(s => [s[0], s[1].map(x => {
    if (x !== 'no other') {
      return[x.replace(/\d+/g, '').trim(), parseInt(x.match(/[0-9]+/g))]
    } else {
      return null
    }})])
  .map(s => [s[0], s[1].filter(x => x !== null)])

const keys = arrays.map(s => s[0])
const check = (arr, k) => (
  arr.find(a => {
    let c = false
    a[1].forEach(x => {
      if (x[0] !== 'shiny gold' && k.indexOf(x[0]) > -1) { c = true }
    })
    return c
  })
)

while (
  check(arrays, keys)
) {
  arrays = arrays.map(s => [s[0], s[1].map(x => {
    if (keys.indexOf(x[0]) > -1 && x[0] !== 'shiny gold') {
      return arrays.find(a => a[0] == x[0])[1].map(y => [y[0], y[1] * x[1]])
    } else {
      return [x]
    }
  })])
  arrays = arrays.map(a => [a[0], a[1].flat(1)])
}

let res = 0
arrays.forEach(a => {
  if (a[1] && a[1].length) { res += 1 }
})

console.log('result: ', res)

