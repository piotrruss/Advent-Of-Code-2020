const data = require('./data')
const test = (d, i, nr) => {
  if (i > nr) {
    let sums = []
    for (let a = i - nr - 1; a < i; a++) {
      for (let b = i - nr - 1; b < i; b++) {
        if (a !== b) {
          sums.push(data[a]+data[b])
        }
      }
    }
    return sums.indexOf(data[i]) < 0
  } else {
    return false
  }
}

const findNr = (nr) => (
  data.find((d, i) => {
    return test(d, i, nr)
  })
)

console.log(findNr(25))
