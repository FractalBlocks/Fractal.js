let Type = require('union-type')
let R = {
  T: require('ramda/src/T')
}


export default {
  types: Type({
    read: [R.T, R.T],
  }),
  task: function() {
    let taskFn = this.types.caseOn({
      read: (file, {success = () => 0, error = () => 0}) => {
        var reader = new FileReader()
        reader.onload = function(ev) {
          var contents = ev.target.result
          success(contents)
        }
        reader.onerror = () => error(`Error reading ${file}`)
        reader.readAsText(file)
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
