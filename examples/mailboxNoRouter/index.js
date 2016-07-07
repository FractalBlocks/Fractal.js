require('../styles.css')
const F = require('../../lib')
const io = require('socket.io-client')

const realData = require('./data.service') // real data service
const mockedData = require('./mocked-data.service') // mocked data service

// realData | mockedData, for a real server uncomment socketio
const data = realData
let socket = io(data.serverName, {})

data.connect(socket)

let engine = F.run({
  root: F.log(require('./mailbox')),
  tasks: {
    data: F.tasks.data.task(data.emit),
  },
  drivers: {
    view: require('../../lib/drivers/view')('#app'),
    data: require('../../lib/drivers/event')(data.subscribeAll),
  },
})

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./mailbox', (comp) => {
    // Mutate the variable holding our component
    let module = require('./mailbox')
    engine.reattach(module)
  })
}

