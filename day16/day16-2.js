const data = require('./data')
const ranges = data
  .split('\nyour ticket:')[0]
  .split(/\n/g)
  .filter(r => r)
  .map(r => ({[r.split(': ')[0]]: r.split(': ')[1].split(' or ').map(s => s.split('-').map(a => parseInt(a)))}))
  .reduce((c, n) => ({ ...c, ...n}), {})

const your = data
  .split('your ticket:\n')[1]
  .split('nearby tickets:\n')[0]
  .split(',')
  .map(n => parseInt(n.replace(/\n/g,'')))

const nearby = data
  .split('nearby tickets:\n')[1]
  .split(/\n/g)
  .filter(n => n)
  .map(n => n.split(',').map(nr => parseInt(nr)))
  .filter(n => n.every(nr => Object.values(ranges).some(r => r.some(ra => nr >= ra[0] && nr <= ra[1] ))))

const nearbyColumns = Array(nearby[0].length).fill([])
nearby.forEach((n) => {
  n.forEach((num, i) => {
    nearbyColumns[i] = [ ...nearbyColumns[i], num]
  })
})

const ids = {}
const keys = Object.keys(ranges)
keys.forEach(key => {
  ids[key] = []
  nearbyColumns.filter((col, id) => {
    const check = col.every(n => ranges[key].some(r => n >= r[0] && n <= r[1]))
    if (check) { ids[key].push(id)  }
    return check
  })
});

const simplify = (arr) => {
  if (arr.every(a => a.length === 1)) {
    return arr
  } else {
    const singles = arr.filter(a => a.length === 1).map(a => a[0])
    const newArr = arr.map(a => a.filter(n => !singles.includes(n) || a.length === 1))
    return simplify(newArr)
  }
}

const result = simplify(Object.values(ids))
  .filter((v,i) => Object.keys(ids)[i].startsWith('departure'))
  .map(d => your[d[0]])
  .reduce((a,b) => a * b, 1)

console.log('Answer: ', result)

