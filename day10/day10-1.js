const data = require('./data')
let jolts = 0, diff1 = 0, diff3 = 1

const next = () => {
  const possible = data.filter(a => [jolts+1, jolts+2, jolts+3].indexOf(a) > -1)
  return possible.length > 0 && Math.min.apply(Math, possible)
}

while (next()) {
  if ((next() - jolts) === 1) {
    diff1 += 1
  } else if ((next() - jolts) === 3) {
    diff3 += 1
  }
  jolts = next()
}

console.log(diff1*diff3)

