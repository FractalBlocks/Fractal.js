let Type = require('union-type')
let R = {
  T: require('ramda/src/T')
}


export default {
  types: Type({
    emit: [String, R.T, R.T],
  }),
  task: function(emitData) {
    let taskFn = this.types.caseOn({
      emit: (key, value, cbs) => {
        emitData(key, value, cbs)
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
