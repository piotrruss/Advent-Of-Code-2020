const data = require('./data')
const numbers = data.split(/\n/).filter(d => d).map(d => parseInt(d))
let number2
const number1 = numbers.find(n => numbers.some(nu => {
  return number2 = numbers.find(num => n + nu + num === 2020)
}))

console.log('Answer: ', number1 * number2 * (2020 - number1 - number2))
