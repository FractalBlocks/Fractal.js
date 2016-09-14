const flyd = require('flyd')

export default function localStorage(name) {
  let listener$
  return {
    attach: (data$) => {
      listener$ = flyd.on(data => {
      	localStorage.setItem(name, JSON.stringify(data))
      }, data$)
    },
    reattach: (data$) => {
      listener$.end(true)
      listener$ = flyd.on(data => {
        localStorage.setItem(name, JSON.stringify(data))
      }, data$)
    },
    dispose: () => {
      localStorage.removeItem(name)
      listener$.end(true)
    },
  }
}
