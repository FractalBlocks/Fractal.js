const F = require('../../lib')

const main = require('./main')
const home = require('./modules/home')
const page0 = require('./modules/page0')
const page1 = require('./modules/page1')
const page2 = require('./modules/page2')


module.exports = F.router.def({path: '/', module: main, props: {}, childRoutes: [
  {path: '/', module: home, props: {}},
  {path: 'page0', module: page0, props: {}},
  {path: 'page1', module: page1, props: {}},
  {path: 'page2', module: page2, props: {}},
  {path: 'main/', module: main, props: {}, childRoutes: [
    {path: '/', module: home, props: {}},
  ]},
]})
