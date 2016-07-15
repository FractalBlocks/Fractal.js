let Type = require('union-type')
const addressbar = require('addressbar')


module.exports = {
  types: Type({
    navigateTo: [String],
  }),
  task: function() {
    let taskFn = this.types.caseOn({
      navigateTo: (path, {success = () => 0, error = () => 0}) => {
        addressbar.value = '#' + path
        // generate the event
        let ev = {
          target: {
            value: addressbar.value
          },
          preventDefault: () => 0,
        }
        addressbar.listeners('change').forEach(l => l(ev))
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
