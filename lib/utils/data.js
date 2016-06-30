
// common fetch utils

const fetchObj = obj => {
  let handled = false
  let status = (response) => {
    if (response.status >= 200 && response.status < 300) {
      handled = true
      return Promise.resolve(response)
    } else {
      if (response.status == 401 || response.status == 403) {
        obj.error('denied', response.status)
      } else {
        obj.error('error', response.status)
      }
      handled = true
      return Promise.reject(new Error(response.statusText))
    }
  }

  return fetch(obj.url, obj.options)
  .then(status)
  .then(obj.response)
  .then(obj.success)
  .catch(err => {
    if (!handled)
      obj.error('netError', err)
  })
}

const fetchAll = (objs, success) => {

  let promiseArray = objs.map((obj, i) => {
    let handled = false
    let status = (response) => {
      if (response.status >= 200 && response.status < 300) {
        handled = true
        return Promise.resolve(response)
      } else {
        if (response.status == 401 || response.status == 403) {
          obj.error('denied', response.status)
        } else {
          obj.error('error', response.status)
        }
        handled = true
        return Promise.reject(new Error(response.statusText))
      }
    }

    return fetch(obj.url, obj.options)
      .then(status)
      .then(obj.response)
  })

  return Promise.all(promiseArray)
  .then(success)
}

module.exports = {
  fetch: fetchObj,
  fetchAll,
}
