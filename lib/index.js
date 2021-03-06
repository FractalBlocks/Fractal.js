'use strict'

export default {
  ...require('./core').default,
  ...require('./engine').default,
  ...require('./utils/composing').default,
  flyd: require('flyd'),
  h: require('snabbdom/h'),
  timetravel: require('./modules/timetravel').default,
  service: require('./service').default,
  noChildren: require('./modules/noChildren').default,
  // serviceTest: require('./serviceTest').default, (Drafted)
  // router: require('./router').default,
  ...require('./utils/test').default,
  data: require('./utils/data').default,
  style: require('./utils/style').default,
  tasks: {
    view: require('./tasks/view').default,
    data: require('./tasks/data').default,
    value: require('./tasks/value').default,
    emitter: require('./tasks/emitter').default,
    fetch: require('./tasks/fetch').default,
    file: require('./tasks/file').default,
  },
  drivers: {
    view: require('./drivers/view').default,
    event: require('./drivers/event').default,
    listenable: require('./drivers/listenable').default,
    stateChange: require('./drivers/stateChange').default,
    load: require('./drivers/load').default,
    time: require('./drivers/time').default, // NEEDS REVIEW!! (maybe depreecated.default)
    localStorage: require('./drivers/localStorage').default,
    screenInfo: require('./drivers/screenInfo').default,
  },
}
