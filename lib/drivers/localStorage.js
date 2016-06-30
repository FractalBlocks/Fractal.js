const flyd = require('flyd')

let localStorageDriver = (name) => {
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

export default localStorageDriver
