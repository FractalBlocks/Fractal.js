// abstractions for a service
const F = {
  data: require('./utils/data'),
}
const R = {
  curry: require('ramda/src/curry'),
}

// serverName, store, events, init, connect
export default function service(defObj) {

  let isQueued = !!defObj.isQueued

  let log = defObj.hasOwnProperty('log') || true

  // TODO: fix this bug
  // let subscribed = defObj.subscribed || () => 0
  let subscribed = true

  let serverName = defObj.serverName
  let store = defObj.store
  // TODO: document store._initialNotify
  store._initialNotify = store.hasOwnProperty('_initialNotify') ? store._initialNotify : true
  let eventQueue = []


  let subscribers = -1

  let events = defObj.events(store, notify, emit)
  function emit(name, value, cbObj) {
    if (events[name]) {
      if (store.connected || !isQueued) {
        events[name](value, cbObj)
      } else {
        eventQueue.push({name, value, cbObj})
      }
    } else if (log) {
      console.warn(`There are no event handler for ${name} in this service`)
    }
  }
  let init = R.curry(defObj.init)(store, emit)
  defObj.connect = R.curry(defObj.connect)(store, emit)

  function notify(name, data) {
    for (var subscriber in subscribers) {
      let parts = subscriber.split('_')
      if (parts[parts.length - 1] === name) {
        subscribers[subscriber](data)
      }
    }
  }

  function subscribeAll(subs) {
    // avoid a bug with flyd.on TODO: needs review
    if (subs != undefined) {
      if (subscribers == -1 && store._initialNotify) { // Fixed needs review
        subscribers = subs
      } else {
        subscribers = subs
      }
    }
  }

  // merge tasks and drivers to store
  if (defObj.tasks) {
    defObj.tasks = defObj.tasks(emit)
    store._tasks = defObj.tasks
  }
  if (defObj.drivers) {
    defObj.drivers = defObj.drivers(emit, subscribeAll)
    store._drivers = defObj.drivers
  }

  return {
    serverName,
    get: function(key) {
      return data[key]
    },
    emit,
    connect: function(connectionInfo) {
      function success() {
        let promises = []
        let ev
        while (ev = eventQueue.pop()) {
          promises.push(new Promise(function(resolve, reject) {
            events[ev.name](ev.value, resolve, reject)
          }))
        }
        // TODO: handle errors
        Promise.all(promises)
          .then(() => init(() => 0, () => 0))
      }

      defObj.connect(connectionInfo, (isQueued) ? success : init(() => 0, () => 0))
    },
    tasks: defObj.tasks,
    drivers: defObj.drivers,
    subscribeAll,
  }
}
