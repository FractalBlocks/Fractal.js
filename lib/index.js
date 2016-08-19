'use strict'

module.exports = {
  ...require('./core'),
  ...require('./engine'),
  h: require('snabbdom/h'),
  flyd: require('flyd'),
  timetravel: require('./modules/timetravel'),
  log: require('./modules/log'),
  router: require('./router'),
  service: require('./modules/service'),
  noChildren: require('./modules/noChildren'),
  tasks: {
    data: require('./tasks/data'),
    value: require('./tasks/value'),
    fetch: require('./tasks/fetch'),
    socketio: require('./tasks/socketio'),
  },
  drivers: {
    view: require('./drivers/view'),
    event: require('./drivers/event'),
    fetch: require('./drivers/fetch'), // DEPRECATED
    time: require('./drivers/time'), // NEEDS REVIEW!! (maybe depreecated)
    load: require('./drivers/load'),
    localStorage: require('./drivers/localStorage'),
    screenInfo: require('./drivers/screenInfo'),
    socketio: require('./drivers/socketio'),
  },
  ...require('./utils/helpers'),
  data: require('./utils/data'),
  style: require('./utils/style'),
  css: require('./utils/style'), // DEPRECATED
}
