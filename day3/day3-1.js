const data = require('./data')

let trees = 0;
data.forEach((line, i) => {
  line[(3 * i)%line.length] === "#" && (trees += 1)
})

console.log(trees)

