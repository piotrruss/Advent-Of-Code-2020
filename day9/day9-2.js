const data = require('./data')
const test = (d, i, nr) => {
  if (i > nr) {
    let sums = []
    for (let a = i - nr - 1; a < i; a++) {
      for (let b = i - nr - 1; b < i; b++) {
        if (a !== b) {
          sums.push(data[a] + data[b])
        }
      }
    }
    return sums.indexOf(data[i]) > -1 ? false : true
  } else {
    return false
  }
}

const findNr = (nr) => (
  data.find((d, i) => {
    return test(d, i, nr)
  })
)

const number = (findNr(25))

//part2

let result
data.find((d, i) => {
  let sum = 0
  for (let a = i; a < data.length; a++) {
    sum += data[a]
    if (sum === number) {
      const range = data.slice(i, a)
      const min = Math.min(...range)
      const max = Math.max(...range)
      result = min + max
      return true
    }
  }
})

console.log(result)

