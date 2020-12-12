const data = require('./data')
const rows = data.split(/\n/g).filter(r => r)
const rowsLn = rows[0].length
const string = rows.join('')

const checkSeat = (i, s) => {
  const lookup = (index, posCheck, next) => {
    const nextIndex = next(index)
    return posCheck(index)
      ? (s[nextIndex] !== '.' ? s[nextIndex] : lookup(nextIndex, posCheck, next))
      : '.'
  }

  const around = [
    lookup(i, i => (i >= rowsLn), i => (i-rowsLn)),                                   // Top
    lookup(i, i => (i >= rowsLn && (i+1)%rowsLn !== 0), i => (i+1-rowsLn)),           // T-R
    lookup(i, i => ((i+1)%rowsLn !== 0), i => (i+1)),                                 // Rigth
    lookup(i, i => (i < s.length - rowsLn && (i+1)%rowsLn !== 0), i => (i+1+rowsLn)), // B-R
    lookup(i, i => (i < s.length - rowsLn), i => (i+rowsLn)),                         // Bottom
    lookup(i, i => (i%rowsLn !== 0 && i < s.length -rowsLn), i => (i-1+rowsLn)),      // B-L
    lookup(i, i => (i%rowsLn !== 0), i => (i-1)),                                     // Left
    lookup(i, i => (i > rowsLn && i%rowsLn > 0), i => (i-1-rowsLn)),                  // T-L
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
    } else if (s === '#' && taken >= 5) {
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
