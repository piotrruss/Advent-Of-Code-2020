const data = require('./data')
const splitted = data
  .map(s => s.split(' '))
  .map(s => [s[0], parseInt(s[1])])

let cont = true, field = 0, accu=0
while (cont && !splitted[field][2]) {
  switch(splitted[field][0]) {
    case 'nop':
      splitted[field].push(true)
      field += 1
      break
    case 'acc':
      splitted[field].push(true)
      accu += splitted[field][1]
      field += 1
      break
    case 'jmp':
      splitted[field].push(true)
      field += splitted[field][1]
      break;
    default:
      cont = false
  }
}

console.log(accu)

