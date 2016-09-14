let Type = require('union-type')
let R = {
  T: require('ramda/src/T')
}


export default {
  types: Type({
    send: [String],
  }),
  task: function(sendValue) {
    let taskFn = this.types.caseOn({
      send: (value) => {
        sendValue(value)
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
