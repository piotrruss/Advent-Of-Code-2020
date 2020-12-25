const data = require('./data')
const [player1, player2] = data
  .split('\n\n').filter(Boolean)
  .map(p => p.split(/\n/g).filter(Boolean).slice(1).map(n => parseInt(n)))

const game = (players, rec = false) => {
  const prev = {}
  const p1 = players[0]
  const p2 = players[1]

  while (players.every((player) => player.length > 0)) {
    const k = players.map(p => p.join(',')).join('|')
    if (prev[k]) { return [[1], []] }
    prev[k] = true

    const c1 = p1.shift()
    const c2 = p2.shift()

    if (rec && p1.length >= c1 && p2.length >= c2) {
      const [r1, r2] = game([[...p1.slice(0, c1)], [...p2.slice(0, c2)]], true)
      if (r1.length > r2.length) {
        p1.push(c1, c2)
      } else {
        p2.push(c2, c1)
      }
    } else if (c1 > c2) {
      p1.push(c1, c2)
    } else {
      p2.push(c2, c1)
    }
  }

  return players
}

const score = game([player1, player2], true).flat().reverse()
  .map((c, i) => parseInt(c) * (i+1)).reduce((a,b) => a+b, 0)

console.log('Answer: ', score)

