const data = require('./data')
const lines = data.split(/\n/g).filter(Boolean)

const ev = (str) => {
  let spl = str.split(' ')
  while(spl.length > 1) {
    spl = [eval(spl.slice(0, 3).join(''))].concat(spl.slice(3))
  }
  return spl[0]
}

const evPar = (str) => {
  while(/\(/.test(str)) {
    str = str.replace(/\(([^()]+)\)/g, (match, par) => ev(par))
  }
  return ev(str)
}

let sum = 0
lines.forEach(l => sum += evPar(l))
console.log('Answer: ', sum)

