require('../styles.css')
const F = require('../../lib')
const io = require('socket.io-client')

const serverName = 'http://localhost:4000'

let socket = io(serverName, {})

let engine = F.run({
  root: F.log(require('./chat')),
  tasks: {
    socket: F.tasks.socketio.task(socket),
  },
  drivers: {
    view: require('../../lib/drivers/view')('#app'),
    socket: require('../../lib/drivers/socketio')(socket),
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

