const data = require('./data')
const checkPass = (query) => {
  const first = (parseInt(query.split("-")[0]) - 1)
  const second = (parseInt(query.split("-")[1].split(" ")[0]) - 1)
  const letter = query.split(" ")[1].split(":")[0]
  const pass = query.split(" ")[2]

  return pass[first] === letter && pass[second] !== letter
    || pass[first] !== letter && pass[second] === letter
}

let valid = 0
data.forEach(q => checkPass(q) && (valid += 1))
console.log(valid)
