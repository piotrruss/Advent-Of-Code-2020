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

const variants = {}
  Object.values(allergens).forEach((allergen, i) => {
  const iv = Object.entries(ingredients).filter(i => allergen.every(a => i[1].includes(a)))
  if (iv) { variants[Object.keys(allergens)[i]] = iv }
})

while (Object.values(variants).some(iv => iv.length > 1)) {
  Object.entries(variants).forEach(iv => {
    if (iv[1].length === 1) {
      Object.keys(variants).forEach(ik => {
        if (ik !== iv[0]) {
          variants[ik] = variants[ik].filter(x => x[0] != iv[1][0][0])
        }
      })
    }
  })
}

const result = Object.entries(variants)
  .sort((a, b) => a[0].localeCompare(b[0]))
  .map(r => r[1][0][0])
  .join(',')

console.log('Answer: ', result)
