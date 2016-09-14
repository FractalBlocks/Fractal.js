let Type = require('union-type')
let R = {
  T: require('ramda/src/T')
}

// emitter should implement emit function
export default {
  types: Type({
    emit: [String, R.T, R.T],
  }),
  task: function(emt) {
    let emitter = emt
    let taskFn = this.types.caseOn({
      emit: (channel, message, success = () => {}) => {
        if (emitter != undefined) {
          emitter.emit(channel, message, success)
        }
      },
    })
    // task runner
    return {
      run: function(task) {
        // perform side effect
        taskFn(task, '')
      },
      get: emitter,
      set: function(emt) {emitter = emt},
    }
  },
}
