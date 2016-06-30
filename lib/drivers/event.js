const flyd = require('flyd')


module.exports = function(cb) {
  return {
    listener$: null,
    attach: function (event$) {
      this.listener$ = flyd.on(cb, event$)
    },
    reattach: function (event$) {
      this.listener$ = flyd.on(cb, event$)
    },
    dispose: function () {
      this.listener$.end(true)
    },
  }
}
