const data = require('./data')
const numbers = data.split('').map((n) => parseInt(n, 10))
const min = Math.min(...numbers)
const max = Math.max(...numbers)
const start = numbers[0]
const cupsLength = 1000000
const cups = {}
let current = numbers[0]

numbers.forEach((n, i) => {
  cups[n] = {
    prev: numbers[(i + (numbers.length - 1)) % numbers.length],
    next: numbers[(i + 1) % numbers.length],
  }
})

for (let i = max + 1; i <= cupsLength; i++) {
  cups[i] = {
    prev: i - 1,
    next: i + 1,
  }
}

cups[start].prev = cupsLength
cups[numbers[numbers.length - 1]].next = max + 1
cups[max + 1].prev = numbers[numbers.length - 1]
cups[cupsLength].next = start

for (let i = 0; i < 10000000; i++) {
  let destination = current - 1
  const first = cups[current].next
  const second = cups[first].next
  const third = cups[second].next
  const fourth = cups[third].next
  cups[current].next = fourth

  while (
    destination < min
    || destination === first
    || destination === second
    || destination === third
  ) {
    destination--
    if (destination < min) { destination = cupsLength }
  }

  const afterDestination = cups[destination].next
  cups[destination].next = first
  cups[third].next = afterDestination
  current = cups[current].next
}

const res1 = cups[1].next
const res2 = cups[res1].next

console.log('Answer: ', res1 * res2)

