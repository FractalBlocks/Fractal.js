let Type = require('union-type')
let R = {
  T: require('ramda/src/T')
}


module.exports = {
  types: Type({
    emit: [String, R.T],
  }),
  task: function(socket, cb) {
    let taskFn = this.types.caseOn({
      emit: (channel, message) => {
        socket.emit(channel, message)
      },
    })
    if (cb) {
      cb(socket)
    }
    // task runner
    return {
      run: function(task) {
        // perform side effect
        taskFn(task, '')
      },
      get: socket,
    }
  },
}
