const yargs = require('yargs');

console.log( yargs.argv, process.argv[0], process.argv[1], process.cwd(), process.argv[1].replace(process.cwd()+'\\','') )

/*
    node test.js 123 -.123 bob=sam -=rom --sam --bob sam -testr "test2 job" --test2
*/
let result = {
  _: [ 123, -0.123, 'bob=sam' ],
  '=': true,
  r: [ true, 'test2 job' ],
  o: true,
  m: true,
  sam: true,
  bob: 'sam',
  t: [ true, true ],
  e: true,
  s: true,
  test2: true,
  '$0': 'test.js'
}
