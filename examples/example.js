const args = require('../.')
    , argv = '123 -.123 bob=sam -=rom --sam --bob sam -testr "test2 job" --test2 -z=3 --=r 5 -test44 --ram=3=5 --port=80 --port 8080'
    ;

console.log({
  _: [ 123, -0.123, 'bob=sam' ],
  '=': true,
  r: [ true, 'test2 job' ],
  o: true,
  m: true,
  sam: true,
  bob: 'sam',
  t: [ true, true, true, 44 ],
  e: [ true, true ],
  s: [ true, true ],
  test2: true,
  z: 3,
  '=r': 5,
  ram: '3=5',
  port: [ 80, 8080 ],
  '$0': 'examples\\example.js'
})

console.log( argv )

console.log( args.process(argv) )