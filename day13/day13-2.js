const data = require('./data')
const [first, ...busses] = data
  .split('\n')
  .filter(d => d !== '')[1]
  .split(',')
  .map(d => d === 'x' ? null : parseInt(d))

let interval = first, t = 0
busses.forEach((b, i) => {
  if (b) {
    while(true){
      if ((t+i+1) % b === 0) {
        interval *= b
        break
      }
      t += interval
    }
  }
})

console.log('Answer: ', t)

