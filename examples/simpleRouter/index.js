require('../styles.css')
const F = require('../../lib')


let engine = F.run({
  root: F.log(require('./router')),
  tasks: {
    router: F.router.task(),
  },
  drivers: {
    router: F.router.driver(),
    view: F.drivers.view('#app'),
  },
})

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./router', (comp) => {
    // Mutate the variable holding our component
    let module = require('./router')
    engine.reattach(module)
  })
}
