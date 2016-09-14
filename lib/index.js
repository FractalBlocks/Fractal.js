'use strict'

export default {
  ...require('./core').default,
  ...require('./engine').default,
  h: require('snabbdom/h').default,
  flyd: require('flyd').default,
  timetravel: require('./modules/timetravel').default,
  // router: require('./router').default,
  service: require('./service').default,
  noChildren: require('./modules/noChildren').default,
  tasks: {
    data: require('./tasks/data').default,
    value: require('./tasks/value').default,
    fetch: require('./tasks/fetch').default,
    emitter: require('./tasks/emitter').default,
  },
  drivers: {
    view: require('./drivers/view').default,
    event: require('./drivers/event').default,
    listenable: require('./drivers/listenable').default,
    load: require('./drivers/load').default,
    time: require('./drivers/time').default, // NEEDS REVIEW!! (maybe depreecated.default)
    localStorage: require('./drivers/localStorage').default,
    screenInfo: require('./drivers/screenInfo').default,
  },
  ...require('./utils/helpers').default,
  data: require('./utils/data').default,
  style: require('./utils/style').default,
}
