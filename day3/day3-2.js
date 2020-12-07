const data = require('./data')
const check = (x, y) => {
  let trees = 0, turn = 0;
  for(i=0; i<data.length; i=i+y) {
    turn !== 0 && data[i][(x * turn)%data[i].length] === "#" && (trees += 1)
    turn += 1
  }
  return trees
}

console.log(check(1,1) * check(3,1) * check(5,1) * check(7,1) * check(1,2))

