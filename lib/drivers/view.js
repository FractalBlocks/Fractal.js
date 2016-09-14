
const flyd = require('flyd')
const h = require('snabbdom/h')

// Common snabbdom patch function (convention over configuration)
const patch = require('snabbdom').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])

export default function view(selector, patchfn = patch) {
  let lastContainer, renderer$
  return {
    attach: (vnode$) => {
      window.addEventListener('DOMContentLoaded', function() {
        let container = document.querySelector(selector)
        renderer$ = flyd.scan(patchfn, container, vnode$.map(vnode => h('div' + selector, [vnode])))
      })
    },
    reattach: (vnode$) => {
      lastContainer = patchfn(document.querySelector(selector), h('div' + selector))
      renderer$ = flyd.scan(patchfn, lastContainer, vnode$.map(vnode => h('div' + selector, [vnode])))
    },
    dispose: () => {
      renderer$.end(true)
    },
  }
}
