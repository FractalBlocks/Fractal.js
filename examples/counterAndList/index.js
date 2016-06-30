const R = require('ramda')
const flyd = require('flyd')
const forwardTo = require('flyd-forwardto')
const Type = require('union-type')
const patch = require('snabbdom').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

require('../styles.css')
const F = require('../../lib/')
// const F = require('../../dist/fractalEngine.min.js')
// const timetravel = require('../../dist/timetravel.min.js')

let engine = F.run({
  root: require('./app'),
  log: true, // debugging <DEVELOP>
  drivers: {
    view: require('../../lib/drivers/view')('#app', patch),
    time: require('../../lib/drivers/time')(),
    fetch: require('../../lib/drivers/fetch')(),
  },
})

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./app', (comp) => {
    // Mutate the variable holding our component
    let module = require('./app')
    engine.reattach(module)
  })
}

