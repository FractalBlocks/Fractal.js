
module.exports = {
  h: require('snabbdom/h'),
  ...require('./core'),
  ...require('./engine'),
  timetravel: require('./modules/timetravel'),
  log: require('./modules/log'),
  router: require('./modules/router'),
  service: require('./modules/service'),
  noChildren: require('./modules/noChildren'),
  tasks: {
    data: require('./tasks/data'),
    fetch: require('./tasks/fetch'),
    socketio: require('./tasks/socketio'),
  },
  drivers: {
    view: require('./drivers/view'),
    event: require('./drivers/event'),
    fetch: require('./drivers/fetch'), // deprecated!
    time: require('./drivers/time'),
    load: require('./drivers/load'),
    localStorage: require('./drivers/localStorage'),
    screenInfo: require('./drivers/screenInfo'),
    socketio: require('./drivers/socketio'),
  },
  ...require('./utils/helpers'),
  data: require('./utils/data'),
  css: require('./utils/css'),
}
