const data = require('./data')
const checkPass = (query) => {
  const min = query.split("-")[0]
  const max = query.split("-")[1].split(" ")[0]
  const letter = query.split(" ")[1].split(":")[0]
  const pass = query.split(" ")[2]
  const amount = (pass.match(new RegExp(letter, "g")) || []).length

  return amount >= min && amount <= max
}

let valid = 0
data.forEach(q => checkPass(q) && (valid += 1))
console.log(valid)
