const data = require('./data')
const lines = data.split(/\n/g).filter(Boolean)

const ev = (str) => {
  let spl = str.split(' ')
  while(spl.length) {
    spl = [eval(spl.slice(0, 3).join(''))].concat(spl.slice(3))
  }
  return spl[0]
}

const evPlus = (str) => {
  while (/\+/.test(str)) {
    str = str.replace(/(\d+) \+ (\d+)/g, (match, n1, n2) => parseInt(n1) + parseInt(n2))
  }
  return eval(str)
}

const evPar = (str, ev) => {
  while(/\(/.test(str)) {
    str = str.replace(/\(([^()]+)\)/g, (match, par) => ev(par))
  }
  return ev(str)
}

let sum = 0
lines.forEach(l => sum += evPar(l, evPlus))
console.log('Answer: ', sum)

