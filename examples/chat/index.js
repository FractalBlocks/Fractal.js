import '../styles.css'
import F from '../../lib'
// import F from '../../dist/fractal'
import io from 'socket.io-client'

const serverName = 'http://localhost:4000'

let socket = io(serverName, {})

let engine = F.run({
  logAll: true,
  root: require('./chat').default,
  tasks: {
    value: F.tasks.value.task(onValue),
    socket: F.tasks.emitter.task(socket),
  },
  drivers: {
    view: F.drivers.view('#app'),
    socket: F.drivers.listenable(socket),
  },
})

function onValue(server) {
  // main module can return the serverName as a value via Value Task
  socket.disconnect()
  socket = io(server, {})
  engine.tasks.socket.set(socket)
  engine.drivers.socket.set(socket)
}

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./chat', (comp) => {
    // Mutate the variable holding our component
    let module = require('./chat').default
    engine.reattach(module)
  })
}
