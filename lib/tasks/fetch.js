import Type from 'union-type'
import data from '../utils/data'
const R = {
  T: require('ramda/src/T')
}


export default {
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
