let Type = require('union-type')
let R = {
  T: require('ramda/src/T')
}


module.exports = {
  types: Type({
    emit: [String, R.T, R.T],
  }),
  task: function(s) {
    let socket = s
    let taskFn = this.types.caseOn({
      emit: (channel, message, success = () => {}) => {
        if (socket != undefined) {
          socket.emit(channel, message, success)
        }
      },
    })
    // task runner
    return {
      run: function(task) {
        // perform side effect
        taskFn(task, '')
      },
      get: socket,
      set: function(s) {socket = s},
    }
  },
}
