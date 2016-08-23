const F = require('../../lib')
const io = require('socket.io-client')


module.exports = F.service({
  store: { // _tasks and _drivers scope are reserved
    serverName: 'http://localhost:4000', // defual
    connected: false,
    socket: '',
  },
  tasks: emit => ({
    _: F.tasks.socketio.task(), // Root task, TODO: document it!! (namespacing in services)
    value: F.tasks.value.task(value => emit('serverNameChanged', value)),
  }),
  drivers: (emit, subscribeAll) => ({
    _: F.drivers.socketio(), // Root driver, TODO: document it!! (namespacing in services)
    data: F.drivers.event(subscribeAll), // Root driver, TODO: document it!! (namespacing in services)
  }),
  init: function(data, emit, success, err) {},
  connect: function(data, emit, initialServerName, success) {
    data.socket = io(data.serverName, {})
    data._tasks._.set(data.socket)
    data._drivers._.set(data.socket)
    socketListeners(data, success)
  },
  events: data => ({
    serverNameChanged: function(name, success, error) {
      data.socket.disconnect()
      data.socket = io(name, {})
      data._tasks._.set(data.socket)
      data._drivers._.set(data.socket)
      data.serverName = name
      socketListeners(data, success)
    },
  }),
})

function socketListeners(data, success = () => 0) {
  data.socket.on('connect', function(messages) {
    data.connected = true
    success()
  })
  data.socket.on('disconnect', function(messages) {
    data.connected = false
  })
}
