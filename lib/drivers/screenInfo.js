const flyd = require('flyd')
const {screenInfo} = require('../../lib/utils/screenInfo')

// difing is not necesary beacuse there is no use case in that the screen size has a bunch of changes
let screenInfoDriver = () => {
  return {
    listener$: null,
    screenListener: null,
    attach: function (screen$) {
      this.listener$ = flyd.on(list => {
        this.screenListener = () => {
          let info = screenInfo()
          for (let key in list) {
            list[key].on(info)
          }
        }
        window.addEventListener('resize', this.screenListener)
      }, screen$)
    },
    reattach: function (screen$) {
      this.listener$ = flyd.on(list => {
        this.screenListener = () => {
          let info = screenInfo()
          for (let key in list) {
            list[key].on(info)
          }
        }
        window.addEventListener('resize', this.screenListener)
      }, screen$)
    },
    dispose: function () {
      this.listener$.end(true)
      window.removeEventListener('resize', this.screenListener)
      this.screenListener = null
    },
  }
}

export default screenInfoDriver
