const data = require('./data')
const [player1, player2] = data.split('\n\n').filter(Boolean)
  .map(p => p.split(/\n/g).filter(Boolean).slice(1))

const round = () => {
  const c1 = player1.shift()
  const c2 = player2.shift()
  if (parseInt(c1) > parseInt(c2)) {
    player1.push(c1, c2)
  } else {
    player2.push(c2, c1)
  }
}

while (player1.length>0 && player2.length>0) { round() }

const cards = player1.length > 0 ? player1 : player2
const score = cards.reverse().map((c, i) => parseInt(c) * (i+1)).reduce((a,b) => a + b, 0)

console.log('Answer: ', score)

