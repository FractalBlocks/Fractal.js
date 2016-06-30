const R = require('ramda')
const flyd = require('flyd')
const patch = require('snabbdom').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

require('../../examples/styles.css')
const F = require('../../lib')

let engine = F.run({
  root: F.log(require('./lazyCounterAndList')),
  drivers: {
    view: require('../../lib/drivers/view')('#app', patch),
    time: require('../../lib/drivers/time')(),
    fetch: require('../../lib/drivers/fetch')(),
    screenInfo: require('../../lib/drivers/screenInfo')(),
  },
})

flyd.on(() => console.log('remove!!'), engine.ctx.remove$) // engines have ctx and inputs

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./counterAndList', (comp) => {
    // Mutate the variable holding our component
    let module = require('./counterAndList')
    engine.reattach(module)
  })
}

