const data = require('./data')
const splitted = data
  .split(/mask = /g)
  .filter(d => d !== '\n')
  .map(d => d.split(/\n/g))
  .map(d => d.map((a, i) => (i > 0 ? a.match(/\d+/g) : a)).filter(a => a))
  .map(d => d.map((a, i) => (i > 0 ? a.map((b, i) => i > 0 ? parseInt(b).toString(2).padStart(36, '0') : parseInt(b)) : a)))

let mem = []
splitted.forEach(s => {
  const mask = s[0]
  const applyMask = (str) => (
    str.split('').map((v, i) => (mask[i] !== 'X' ? mask[i] : v)).join('')
  )

  s.forEach((m, i) => (i > 0 && (mem[m[0]] = parseInt(applyMask(m[1]), 2))))
})

console.log('Answer: ', mem.reduce((a, b) => a + b, 0))
