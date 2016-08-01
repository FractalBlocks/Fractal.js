const Type = require('union-type')
const data = require('../utils/data')
const R = {
  T: require('ramda/src/T')
}


module.exports = {
  types: Type({
    fetch: [Object],
  }),
  task: function() {
    let taskFn = this.types.caseOn({
      fetch: (obj) => data.fetch(obj),
    })

    // task runner
    return {
      run: function(obj) {
        // perform side effect
        return taskFn(obj, '')
      },
      get: {},
    }
  },
}
