const data = require('./data')
let cups = data.split('').map(n => parseInt(n))
let current = cups[0]

const move = () => {
  const i = cups.indexOf(current)
  const picked = cups.slice(i+1,i+4)
  const rest = [...cups.slice(0, i+1), ...cups.slice(i+4)]
  const dest = (nr) => {
    if (picked.includes(nr)) {
      return dest(nr-1)
    } else if (nr < Math.min(...rest)) {
      return dest(Math.max(...cups))
    }
    return nr
  }

  rest.splice(rest.indexOf(dest(current-1)) + 1, 0, ...picked)
  const rest1 = rest.slice(0, rest.indexOf(current))
  const rest2 = rest.slice(rest.indexOf(current))
  cups = [...rest2, ...rest1]
  current = cups[cups.indexOf(current)+1]
}

for(let j=1; j<=100; j++) {
  move()
}

const cups1 = cups.slice(0, cups.indexOf(1))
const cups2 = cups.slice(cups.indexOf(1))
cups = [...cups2, ...cups1]

console.log('Answer: ', cups.slice(1).join(''))
