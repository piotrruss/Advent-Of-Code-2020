const data = [0,3,6]

const numbers = {}
let last, prev1, prev2

const game = (turns) => {
  for (let i=1; i <= turns; i++) {
    if (i <= data.length) {
      numbers[data[i-1]] = [i, 0]
      last = data[i-1]
    } else {
      [prev1, prev2] = numbers[last]
      if (!prev2) {
        last = 0
        numbers[0] = [i, numbers[0][0]]
      } else {
        last = prev1 - prev2
        if (numbers[last]) {
          numbers[last] = [i, numbers[last][0]]
        } else {
          numbers[last] = [i, 0]
        }
      }
    }
  }
}

game(2020)
console.log(last)

