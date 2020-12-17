const data = require('./data')
const startArray = [data.split(/\n/g).filter(e => e).map(e => e.split(''))]
const cycle = (arr) => {
  const l = arr[0].length
  const empty = Array(l+2).fill(Array(l+2).fill('.'))
  const empty2 = Array(l+2).fill('.')
  const addDots = ars => ars.map(ar => ([empty2, ...(ar.map(a => ['.', ...a, '.'])), empty2]))
  const resized = [empty, ...addDots(arr), empty]
  const around = (iz, iy, ix) => {
    const f = (rz, ry, rx) => {
      if (
        !resized[iz+rz]
        || !resized[iz+rz][iy+ry] 
        || !resized[iz+rz][iy+ry][ix+rx]
      ) { return 0 }
      return resized[iz+rz][iy+ry][ix+rx] === '#' ? 1 : 0
    }

    let c = 0
    for (let z=-1; z<=1; z++) {
      for (let y=-1; y<=1; y++) {
        for (let x=-1; x<=1; x++) {
          if(!(x == 0 && y == 0 && z == 0)) { c += f(z, y, x) }
        }
      }
    }
    return c
  }

  return resized.map((z, iz) => z.map((y,iy) => y.map((x,ix) => {
    const active = x === '#'
    const activeAround = around(iz,iy,ix)

    if (active) {
      return (activeAround === 2 || activeAround === 3) ? '#' : '.'
    } else {
      return (activeAround === 3) ? '#' : '.'
    }
  })))
}

let cycleResult = startArray, round = 1
while (round <= 6) {
 cycleResult = cycle(cycleResult)
 round++
}

let result = 0
cycleResult.forEach(z => z.forEach(y => y.forEach(x => {
  if (x === '#') {result++}
})))

console.log('Answer: ', result)

