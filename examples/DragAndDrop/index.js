const R = require('ramda')
const flyd = require('flyd')
const patch = require('snabbdom').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

require('../styles.css')
const F = require('../../lib')

let engine = F.run({
  root: F.log(require('./app')),
  drivers: {
    view: require('../../lib/drivers/view')('#app', patch),
  },
})

flyd.on(() => console.log('remove!!'), engine.ctx.remove$) // engines have ctx and inputs

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./app', (comp) => {
    // Mutate the variable holding our component
    let module = require('./app')
    engine.reattach(module)
  })
}

