const R = require('ramda')
const patch = require('snabbdom').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

require('./styles.css')
const F = require('../../lib')


let patchJax = (o, n) => {
  let vnode = patch(o, n)
  try {
    MathJax.Hub.Queue(["Typeset", MathJax.Hub])
  } catch (e) {}
  return vnode
}

let engine = F.createEngine({
  root: F.log(require('./app')),
  drivers: {
    view: require('../../lib/drivers/view')('#app', patchJax),
    time: require('../../lib/drivers/time')(),
    fetch: require('../../lib/drivers/fetch')(),
  },
})

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./app', (comp) => {
    // Mutate the variable holding our component
    let module = timetravel(require('./app'))
    engine.reattach(module)
  })
}

