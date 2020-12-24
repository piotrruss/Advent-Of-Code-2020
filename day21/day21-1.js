const data = require('./data')
let arr = data
  .split(/\n/g).filter(Boolean)
  .map(l => l.replace(')','').split(' (contains '))
  .map(l => [l[0].split(' '), l[1].split(', ')])

const ingredients = {}
const allergens = {}

for (let i=0; i<arr.length; i++) {
  for (let j=0; j<arr[i][0].length; j++) {
    let ingredient = arr[i][0][j]
    if (!ingredients[ingredient]) { ingredients[ingredient] = [] }
    ingredients[ingredient].push(i)
  }
  for (let k=0; k<arr[i][1].length; k++) {
    let allergen = arr[i][1][k]
    if (!allergens[allergen]) { allergens[allergen] = [] }
    allergens[allergen].push(i)
  }
}

Object.values(allergens).forEach(allergen => {
  Object.entries(ingredients).forEach(ingredient => {
    if(allergen.every(a => ingredient[1].includes(a))) {
      delete ingredients[ingredient[0]]
    }
  })
})

const answer = Object.values(ingredients).map(i => i.length).reduce((a, b) => a + b, 0)
console.log('Answer: ', answer)
