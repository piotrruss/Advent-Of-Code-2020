const data = require('./data')
const startArray = [[data.split(/\n/g).filter(e => e).map(e => e.split(''))]]

const cycle = (array) => {
  const l = array[0][0].length
  const empty = Array(l+2).fill(Array(l+2).fill('.'))
  const empty2 = Array(l+2).fill('.')
  const empty3 = Array(array.length + 2).fill(empty)
  const addDots = ars => ars.map(ar => ([empty2, ...(ar.map(a => ['.', ...a, '.'])), empty2]))
  const resized = [ empty3, ...array.map(arr => [empty, ...addDots(arr), empty]), empty3]
  const around = (iw, iz, iy, ix) => {
    const f = (rw, rz, ry, rx) => {
      if (
        !resized[iw+rw]
        || !resized[iw+rw][iz+rz]
        || !resized[iw+rw][iz+rz][iy+ry]
        || !resized[iw+rw][iz+rz][iy+ry][ix+rx]
      ) { return 0 }
      return resized[iw+rw][iz+rz][iy+ry][ix+rx] === '#' ? 1 : 0
    }

    let c = 0
    for (let w=-1; w<=1; w++) {
      for (let z=-1; z<=1; z++) {
        for (let y=-1; y<=1; y++) {
          for (let x=-1; x<=1; x++) {
            if (!(x===0 && y===0 && z===0 && w===0)) { c += f(w,z,y,x) }
          }
        }
      }
    }
    return c
  }

  return resized.map((w, iw) => w.map((z, iz) => z.map((y,iy) => y.map((x,ix) => {
    const active = x === '#'
    const activeAround = around(iw,iz,iy,ix)
    if (active) {
      return (activeAround === 2 || activeAround === 3) ? '#' : '.'
    } else {
      return (activeAround === 3) ? '#' : '.'
    }
  }))))
}

let cycleResult = startArray, round = 1
while (round <= 6) {
  cycleResult = cycle(cycleResult)
  round++
}

let result = 0
cycleResult.forEach(w => w.forEach(z => z.forEach(y => y.forEach(x => {
  if (x === '#') {result++}
}))))

console.log('Answer: ', result)

