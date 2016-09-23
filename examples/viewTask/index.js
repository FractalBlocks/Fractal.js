import '../styles.css'
// import F from '../../dist/fractal'
import F from '../../lib'


let engine = F.run({
  logAll: true,
  root: require('./app').default,
  tasks: {
    view: F.tasks.view.task('#app'),
  },
  drivers: {
    view: F.drivers.view('#app'),
  },
})

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./app', (comp) => {
    // Mutate the variable holding our component
    let module = require('./app').default
    engine.reattach(module)
  })
}
