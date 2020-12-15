const data = require('./data')
const numbers = data.split(/\n/).filter(d => d).map(d => parseInt(d))
const number = numbers.find(n => numbers.some(num => n + num === 2020))
console.log('Answer: ', number * (2020 - number))
