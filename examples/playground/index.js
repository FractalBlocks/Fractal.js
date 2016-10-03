import '../styles.css'
import F from '../../lib'
import flyd from 'flyd'


let engine = F.run({
  logAll: true,
  root: require('./lazyCounterAndList').default,
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
    let module = require('./lazyCounterAndList').default
    engine.reattach(module)
  })
}
