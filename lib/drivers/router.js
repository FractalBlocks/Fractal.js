const flyd = require('flyd')
const addressbar = require('addressbar')
const urlMapper = require('url-mapper')()


module.exports = function() {

  let subscribers = -1
  /* In the form: {
    listenerName1: [listenerFn1, listenerFn2, ...],
    listenerName2: [listenerFn1, listenerFn2, ...],
  }
  */
  let listeners

  addressbar.addEventListener('change', function (ev) {
    ev.preventDefault()
    let url = new URL(ev.target.value)
    let path = (url.pathname == '/' && url.hash != '') ? url.hash.slice(1) : url.pathname
    // let matchedRoute = urlMapper.map(path, {
    //   '/foo/:id': 1,
    //   '/test/:id': 2,
    //   '*': 3,
    // })
    // console.log(matchedRoute)
  })

  function setSubscribers(subs) {

    listeners = {}

    for (let subscriber in subs) {
      let parts = subscriber.split('_')
      let name = parts[parts.length - 1]
      if (listeners[name]) {
        listeners[name].push(subs[subscriber])
      } else {
        listeners[name] = [subs[subscriber]]
      }
    }
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
