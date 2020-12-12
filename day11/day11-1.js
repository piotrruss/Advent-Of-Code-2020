const data = require('./data')
const rows = data.split(/\n/g).filter(r => r)
const rowLn = rows[0].length
const string = rows.join('')

const checkSeat = (i, s) => {
  const around = [
    i >= rowLn ? s[i-rowLn] : '.',                                  // top
    i >= rowLn && (i+1)%rowLn !== 0 ? s[i+1-rowLn] : '.',           // top-right
    (i+1)%rowLn !== 0 ? s[i+1] : '.',                               // right
    i < s.length -rowLn && (i+1)%rowLn !== 0 ? s[i+1+rowLn] : '.',  // bottom-right
    i < s.length -rowLn ? s[i+rowLn] : '.',                         // bottom
    i%rowLn !== 0 && i < s.length -rowLn ? s[i-1+rowLn] : '.',      // bottom-left
    i%rowLn !== 0 ? s[i-1] : '.',                                   // left
    i > rowLn && i%rowLn > 0 ? s[i-1-rowLn] : '.',                  // top-left
  ]

  const taken = around.filter(s => s === '#').length
  const free = around.filter(s => s === 'L').length

  return [taken, free]
}

const round = (str) => {
  const newArray = []
  str.split('').forEach((s, i) => {
    const [taken, free] = checkSeat(i, str)
    if (s === 'L' && taken === 0) {
      newArray[i] = '#'
    } else if (s === '#' && taken >= 4) {
      newArray[i] = 'L'
    } else {
      newArray[i] = str[i]
    }
  })

  const newString = newArray.join('')
  return newString === str
    ? newString.split('').filter(s => s === '#').length
    : round(newString)
}

console.log(round(string))
