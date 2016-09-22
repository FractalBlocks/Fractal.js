import '../styles.css' // Global styles , TODO: Document it!! (should be in a quickstart or seed documentation)
import F from '../../lib'
import socketService from './socket.service'

socketService.connect()


let engine = F.run({
  logAll:true,
  root: require('./chat').default,
  services: {
    socketService,
  },
  drivers: {
    view: F.drivers.view('#app'),
  },
})


// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./chat', (comp) => {
    // Mutate the variable holding our component
    let module = require('./chat').default
    engine.reattach(module)
  })
}

