
const flyd = require('flyd')

let viewDriver = () => {
  return {
    attach: (vnode$) => {
      flyd.on(f => {
      	f()
      	vnode$.end(true)
      }, vnode$)
    },
    reattach: (vnode$) => {
    },
    dispose: () => {
    },
  }
}

export default viewDriver
