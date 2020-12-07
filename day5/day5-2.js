const data = require('./data')
const filterPlaces = (pass, entity, mark, min, max) => (
  pass.forEach((p, i) => {
    if (i > min && i <= max) {
      p === mark
        ? entity.splice(entity.length / 2, entity.length)
        : entity.splice(0, entity.length / 2)
    }
  })
)

const checkId = (p) => {
  const pass = p.split('')
  const row = [...Array(128).keys()]
  const column = [...Array(8).keys()]

  filterPlaces(pass, row, 'F', -1, 6)
  filterPlaces(pass, column, 'L', 6, 9)

  return ID = row[0] * 8 + column[0]
}

const ids = [...data].map(checkId).sort((a, b) => (a-b))
const missing = ids.filter((id, i) => ids[i] + 1 !== ids[i + 1]
  && id !== ids[ids.length-1] )[0] + 1

console.log(missing)

