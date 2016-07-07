let Type = require('union-type')
let R = {
  T: require('ramda/src/T')
}


module.exports = {
  types: Type({
    emit: [String, R.T, R.T],
  }),
  task: function(emitData) {
    let taskFn = this.types.caseOn({
      emit: (key, value, {success = () => 0, error = () => 0}) => {
        emitData(key, value, {success, error})
      },
    })

    // task runner
    return {
      run: function(task) {
        // perform side effect
        taskFn(task, '')
      },
      get: {},
    }
  },
}
