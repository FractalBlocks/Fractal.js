let Type = require('union-type')
const addressbar = require('addressbar')

function getParentPath(path) {
  if (path[path.length - 1] == '/') {
    return path + '#'
  } else {
    let arrPath = path.split('/')
    return arrPath.slice(0, arrPath.length - 1).join('/') + '/#'
  }
}

module.exports = {
  types: Type({
    navigateTo: [String],
  }),
  task: function() {
    let taskFn = this.types.caseOn({
      navigateTo: (path, {relative = true, success = () => 0, error = () => 0}) => {
        // relative(by default): allows infinite composing, absolute(relative: false): replace the whole path
        addressbar.value = (relative) ? (getParentPath(addressbar.value) + path) : '#' + path
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
