const R = require('ramda')
const flyd = require('flyd')

require('../styles.css')
const F = require('../../lib')

let engine = F.run({
  root: F.log(require('./lazyCounterAndList')),
  tasks: {
    fetch: F.tasks.fetch.task(),
  },
  drivers: {
    view: F.drivers.view('#app'),
    time: F.drivers.time(),
  },
})

flyd.on(() => console.log('remove!!'), engine.ctx.remove$) // engines have ctx and inputs

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./lazyCounterAndList', (comp) => {
    // Mutate the variable holding our component
    let module = require('./lazyCounterAndList')
    engine.reattach(module)
  })
}

