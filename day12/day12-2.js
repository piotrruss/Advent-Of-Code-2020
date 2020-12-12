const data = require('./data')
let pos = {x: 0, y: 0}
let vp = {x: 10, y: 1}

const move = (dir => {
  const dir1 = dir.substring(0, 1)
  const dir2 = parseInt(dir.substring(1, dir.length))

  switch(dir1) {
  case 'N': vp.y += dir2; break;
  case 'S': vp.y -= dir2; break;
  case 'E': vp.x += dir2; break;
  case 'W': vp.x -= dir2; break;
  case 'L':
    switch(dir2%360) {
      case 0: break
      case 90: [vp.x, vp.y] = [-vp.y, vp.x]; break
      case 180: [vp.x, vp.y] = [-vp.x, -vp.y]; break
      case 270: [vp.x, vp.y] = [vp.y, -vp.x]; break
      default: console.log('unknown value turning left', dir2);
    }
    break;
  case 'R':
    switch(dir2%360) {
      case 0: break
      case 90: [vp.x, vp.y] = [vp.y, -vp.x]; break
      case 180: [vp.x, vp.y] = [-vp.x, -vp.y]; break
      case 270: [vp.x, vp.y] = [-vp.y, vp.x]; break
      default: console.log('unknown value turning right', dir2);
    }
    break;
  case 'F':
    pos.x += vp.x * dir2
    pos.y += vp.y * dir2
  break;
  default:
    console.log(`unknown value`);
  }
})

data.split(/\n/g).filter(e => e).forEach(e => move(e))
console.log(Math.abs(pos.x) + Math.abs(pos.y))
