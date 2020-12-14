const data = require('./data')
const splitted = data
  .split(/mask = /g)
  .filter(d => d !== '\n')
  .map(d => d.split(/\n/g))
  .map(d => d.map((a, i) => (i > 0 ? a.match(/\d+/g) : a)).filter(a => a))
  .map(d => d.map((a, i) => (i > 0 ? a.map(b => parseInt(b).toString(2).padStart(36, '0')) : a)))

const allVariations = (str, arr) => {
  let i = str.indexOf('X');

  if (i < 0) {
    arr.push(str);
    return;
  }

  const splitStr = str.split('');
  let addZero = splitStr.slice();
  let addOne = splitStr.slice();

  addZero.splice(i, 1, '0');
  addOne.splice(i, 1, '1');

  allVariations(addZero.join(''), arr);
  allVariations(addOne.join(''), arr );
}

const mem = {}
splitted.forEach(s => {
  const mask = s[0]
  const applyMask = (str) => (
    str.split('').map((v, i) => (mask[i] === '0' ? v : mask[i])).join('')
  )

  let variations
  s.forEach((m, i) => {
    variations = []
    if (i > 0) {
      allVariations(applyMask(m[0]), variations)
      variations.forEach(a => {
        mem[parseInt(a, 2)] = parseInt(m[1], 2)
      })
    }
  })
})

const sum = Object.values(mem).reduce((a, b) => a + b, 0)
console.log('Answer: ', sum)
