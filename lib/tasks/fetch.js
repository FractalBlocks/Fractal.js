let Type = require('union-type')
let R = {
  T: require('ramda/src/T')
}


module.exports = {
  types: Type({
    fetch: [Object],
  }),
  task: function() {
    let taskFn = this.types.caseOn({
      fetch: (obj) => fetchObj(obj),
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

const fetchObj = obj => {
  let handled = false
  let status = (response) => {
    if (response.status >= 200 && response.status < 300) {
      handled = true
      return Promise.resolve(response)
    } else {
      if (response.status == 401 || response.status == 403) {
        obj.denied(response.status)
      } else {
        obj.error(response.status)
      }
      handled = true
      return Promise.reject(new Error(response.statusText))
    }
  }

  obj.denied = obj.denied || () => 0
  obj.error = obj.error || () => 0
  obj.netError = obj.netError || () => 0

  return fetch(obj.url, obj.options)
  .then(status)
  .then(obj.response)
  .then(obj.success)
  .catch(err => {
    if (!handled)
      obj.netError(err)
  })
}
