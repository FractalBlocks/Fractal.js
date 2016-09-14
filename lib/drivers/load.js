
const flyd = require('flyd')

export default function load() {
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
