require('../styles.css') // Global styles , TODO: Document it!! (should be in a quickstart or seed documentation)
const F = require('../../lib')

const socketService = require('./socket.service')
socketService.connect()


let engine = F.run({
  root: F.log(require('./chat')),
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
    let module = require('./chat')
    engine.reattach(module)
  })
}

