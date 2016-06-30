const flyd = require('flyd')


let fetchDriver = () => {
  return {
    listener$: null,
    attach: function (fetch$) {
      this.listener$ = flyd.scan((lastList, list) => {
        // TODO: cancel fetchs with fetch api or use AJAX
        let newList = {} // TODO: do it with R.map
        for (let key in list) {
          newList[key] = ((lastObj, obj) => {
            if (!lastObj && obj.active || lastObj && obj && obj.active && (obj.active != lastObj.active)) {
              fetchObj(obj)
              return {active: true}
            }
            return {active: obj.active}
          })(lastList[key], list[key])
        }
        return newList
      }, {}, fetch$)
    },
    reattach: function (fetch$) {
      this.listener$ = flyd.scan((lastList, list) => {
        // TODO: cancel fetchs with fetch api or use AJAX
        let newList = {} // TODO: do it with R.map
        for (let key in list) {
          newList[key] = ((lastObj, obj) => {
            if (!lastObj && obj.active || lastObj && obj && obj.active && (obj.active != lastObj.active)) {
              fetchObj(obj)
              return {active: true}
            }
            return {active: obj.active}
          })(lastList[key], list[key])
        }
        return newList
      }, this.listener$(), fetch$)
    },
    dispose: function () {
      this.listener$.end(true)
    },
  }
}

export default fetchDriver

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

  fetch(obj.url, obj.options)
  .then(status)
  .then(obj.response)
  .then(obj.success)
  .catch(err => {
    if (!handled)
      obj.netError(err)
  })
}
