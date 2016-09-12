// WORKING
const flyd = require('flyd')

// l should implement removeAllListeners and on functions
module.exports = function(l) {

  let listenable = l || {}

  /* In the form: {
    listenerName1: [listenerFn1, listenerFn2, ...],
    listenerName2: [listenerFn1, listenerFn2, ...],
  }
  */
  let listeners

  if (!listenable.removeAllListeners) {
    listenable.removeAllListeners = () => {}
  }

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

    setListeners()
  }

  function setListeners() {
    for (let listenerName in listeners) {
      let listenerArr = listeners[listenerName]
      if (listenerArr.length > 0 && listenable != undefined) {
        listenable.removeAllListeners(listenerName)
        for (let i = listenerArr.length - 1; i >= 0; i--) {
          listenable.on(listenerName, listenerArr[i])
        }
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
    get: function() {return listenable},
    set: function(s) {
      listenable = s
      setListeners()
    },
  }
}
