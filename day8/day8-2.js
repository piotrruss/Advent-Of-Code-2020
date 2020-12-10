const data = require('./data')
const array = data.map(s => s.split(' ')).map(s => [s[0], parseInt(s[1])])
let cont, field, accu, spl, splitted
let success = false, change = 0

while (!success && change < array.length) {
  splitted = JSON.parse(JSON.stringify(array))
  if (splitted[change][0] === 'nop') {
    splitted[change][0] = 'jmp'
  } else if (splitted[change][0] === 'jmp') {
    splitted[change][0] = 'nop'
  }
  cont = true
  field = 0
  accu = 0
  spl = JSON.parse(JSON.stringify(splitted))
  while (cont && !spl[field][2]) {
    if (field === array.length - 1) {
      success = accu
      cont = false
    }

    switch(spl[field][0]) {
      case 'nop':
        spl[field].push(true)
        field += 1
        break
      case 'acc':
        spl[field].push(true)
        accu += spl[field][1]
        field += 1
        break
      case 'jmp':
        spl[field].push(true)
        field += spl[field][1]
        break;
      default:
        cont = false
    }
  }
  change += 1
}

console.log(success)
