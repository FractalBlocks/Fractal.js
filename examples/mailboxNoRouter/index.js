import '../styles.css'
import F from '../../lib'
import io from 'socket.io-client'

import realData from './data.service' // real data service
import mockedData from './mocked-data.service' // mocked data service

// realData | mockedData, for a real server uncomment socketio
const data = realData
let socket = io(data.serverName, {})

data.connect(socket)

let engine = F.run({
  logAll: true,
  root: require('./mailbox').default,
  services: {
    data,
  },
  tasks: {
    data: F.tasks.data.task(data.emit),
  },
  drivers: {
    view: F.drivers.view('#app'),
    data: F.drivers.event(data.subscribeAll),
  },
})

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./mailbox', (comp) => {
    // Mutate the variable holding our component
    let module = require('./mailbox').default
    engine.reattach(module)
  })
}

