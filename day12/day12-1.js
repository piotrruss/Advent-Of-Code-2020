const data = require('./data')
let pos = {x: 0, y: 0}
let direction = 90

const move = (dir => {
  const dir1 = dir.substring(0, 1)
  const dir2 = parseInt(dir.substring(1, dir.length))

  switch(dir1) {
    case 'N': pos.y += dir2; break;
    case 'S': pos.y -= dir2; break;
    case 'E': pos.x += dir2; break;
    case 'W': pos.x -= dir2; break;
    case 'L':
      direction -= dir2
      if (direction < 0) { direction += 360 }
      break;
    case 'R':
      direction += dir2
      if (direction >= 360) { direction -= 360 }
      break;
    case 'F':
      switch(direction) {
        case 0: pos.y += dir2; break;
        case 90: pos.x += dir2; break;
        case 180: pos.y -= dir2; break;
        case 270: pos.x -= dir2; break;
        default: console.log(`unknown direction`);
      }
      break;
    default: console.log(`unknown value`);
  }
})

data.split(/\n/g).filter(e => e).forEach(e => move(e))
console.log(Math.abs(pos.x) + Math.abs(pos.y))
