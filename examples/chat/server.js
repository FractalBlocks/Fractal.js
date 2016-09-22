// socket.io server for mailbox

'use strict'

let server = require('http').Server(function() {}),
  io = require('socket.io')(server)

let sockets = []

io.on('connection', function(socket) {

  console.log('Client connected')

  sockets.push(socket)

  socket.on('disconnect', function() {
    sockets.slice(sockets.indexOf(socket), 1)
  })

  socket.on('messages', function(msgObj) {
    socket.broadcast.emit('messages', msgObj)
  })

})

server.listen(process.env.PORT || 4000, process.env.IP || 'localhost', function() {
  console.log('Server listening...')
})
