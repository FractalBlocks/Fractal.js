const F = require('../../lib')

const addressbar = require('addressbar')
const urlMapper = require('url-mapper')()

const main = require('./main')
const home = require('./modules/home')
const page0 = require('./modules/page0')
const page1 = require('./modules/page1')
const page2 = require('./modules/page2')

// module.exports = main({
//   children: page0,
// })

module.exports = router({path: '', module: main, props: {}, childRoutes: [
  {path: '', module: home, props: {}},
  {path: 'page0', module: page0, props: {}, childRoutes: [
    {path: '', module: home, props: {}},
  ]},
  {path: 'page1', module: page1, props: {}},
  {path: 'page2', module: page2, props: {}},
]})

function router({path, module, props, childRoutes}) {
  let urlPath = ''
  let child = childRoutes[2].module
  return module({child, props})
}
