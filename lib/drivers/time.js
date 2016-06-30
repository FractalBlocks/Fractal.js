const R = {
  mapObjIndexed: require('ramda/src/mapObjIndexed'),
}
const flyd = require('flyd')


//// time driver module ----
let stateNames = ['pending', 'running', 'paused']
let timerPatch = (timeData, obj) => {
  // TODO: Do a better implementation of this driver
  let id = timeData.id
  if (obj.periodic) {
    if (obj.active && obj.active != timeData.active) {
      id = setInterval(() => obj.on(timeData), obj.time)
    } else if (!obj.active && obj.active != timeData.active) {
      clearInterval(id)
      id = null
    } else if (obj.time != timeData.time) {
      clearInterval(id)
      id = setInterval(() => obj.on(timeData), obj.time)
    } else if (id && obj.periodic != timeData.periodic) {
      clearTimeout(id)
      id = setInterval(() => obj.on(timeData), obj.time)
    }
  } else {
    if (obj.active && obj.active != timeData.active) {
      id = setTimeout(() => obj.on(timeData), obj.time)
    } else if (!obj.active && obj.active != timeData.active) {
      clearTimeout(id)
      id = null
    } else if (obj.time != timeData.time) {
      clearTimeout(id)
      id = setTimeout(() => obj.on(timeData), obj.time)
    } else if (obj.periodic != timeData.periodic) {
      clearInterval(id)
      id = setTimeout(() => obj.on(timeData), obj.time)
    }
  }
  return {
    id,
    periodic: obj.periodic,
    active: obj.active,
    time: obj.time,
    on: obj.on,
    state: obj.state,
  }
}

let timerListPatch = (lastList, list) => {
  // dispose removed timers
  for (var name in lastList) {
    if (!list[name]) {
      if (lastList[name].periodic)
        clearInterval(lastList[name].id)
      else
        clearTimeout(lastList[name].id)
    }
  }

  return R.mapObjIndexed((obj, name) => timerPatch(lastList[name] || {}, obj), list)
}

let timeDriver = () => {
  // babel or JS bug the stack is deleted and listener$ in not accesible from attach
  // solution use normal functions (not arrows) and merge listener$ in the object
  // let listener$
  return {
    listener$: null,
    attach: function (time$) {
      this.listener$ = flyd.scan(timerListPatch, {}, time$)
    },
    reattach: function (time$) {
      this.listener$ = flyd.scan(timerListPatch, {}, time$)
    },
    dispose: function () {
      this.listener$.end(true)
    },
  }
}

export default timeDriver
