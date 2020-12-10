const data = require('./data')
const sorted = data.concat(0).sort((a,b) => a - b)
sorted.push(sorted[sorted.length-1] + 3)
const paths = []

const count = (index) => {
  if (index === sorted.length - 1) { return 1 }
  if (paths[index]) { return paths[index] }

  let pathsCount = 0
  sorted
    .filter(s => s > sorted[index] && s <= sorted[index] + 3)
    .forEach(f => pathsCount += count(sorted.indexOf(f)))
  paths[index] = pathsCount
  return pathsCount
}

console.log(count(0))

