const data = require('./data')
const tiles = []
const getSides = (t) => {
  const sides = [t[0], t.map(r=>r[r.length-1]).join(''), t[t.length-1], t.map(r=>r[0]).join('')]
  const reversed = sides.map(s => s.split("").reverse().join(""))
  return [...sides, ...reversed]
}

data
  .split('\n\n')
  .map(s => s.split('\n').filter(Boolean))
  .forEach(s => tiles.push({
    id: parseInt(s[0].match(/[0-9]+/g)[0]),
    array: s.slice(1),
    sides: getSides(s.slice(1)),
    matches: []
  }))

const check = (t1, t2) => {
  for (const s1 of t1.sides) for (const s2 of t2.sides) {
    if (s1 === s2) {return s1}
  }
  return null
}

for (let i=0; i< tiles.length; i++) for (let j=i+1; j<tiles.length; j++) {
  const match = check(tiles[i], tiles[j])
  if (match) {
    tiles[i].matches.push({ id: tiles[j].id, side: match })
    tiles[j].matches.push({ id: tiles[i].id, side: match })
  }
}

const res = tiles
  .filter(t => t.matches.length === 2)
  .map(t => t.id)
  .reduce((a, b) => a * b, 1)

console.log('Answer: ', res)

