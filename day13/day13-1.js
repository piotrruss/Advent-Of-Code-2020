const data = require('./data')
const dataLines = data.split(/\n/g).filter(d => d)
const currentTime = parseInt(dataLines[0])
const busses = dataLines[1].split(',').filter(d => d !== 'x').map(d => parseInt(d))
const timetable = busses
  .map(b => ({'bus': b, 'time': b - currentTime % b}))
  .sort((a,b) => a.time - b.time)

console.log('Answer: ', timetable[0].bus * timetable[0].time)

