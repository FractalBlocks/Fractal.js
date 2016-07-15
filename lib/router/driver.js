const flyd = require('flyd')
const addressbar = require('addressbar')


module.exports = function() {

  let subscribers = -1
  /* In the form: {
    listenerName1: [listenerFn1, listenerFn2, ...],
    listenerName2: [listenerFn1, listenerFn2, ...],
  }
  */

  addressbar.addEventListener('change', function (ev) {
    ev.preventDefault()
    let url = new URL(ev.target.value)
    let path = (url.pathname == '/' && url.hash != '') ? url.hash.slice(1) : url.pathname
    for (let subscriber in subscribers) {
      subscribers[subscriber](path)
    }
    addressbar.value = '#' + path
  })

  function setSubscribers(subs) {
    subscribers = subs
  }

  return {
    listener$: null,
    attach: function (event$) {
      this.listener$ = flyd.on(setSubscribers, event$)
    },
    reattach: function (event$) {
      this.listener$ = flyd.on(setSubscribers, event$)
    },
    dispose: function () {
      this.listener$.end(true)
    },
  }
}
