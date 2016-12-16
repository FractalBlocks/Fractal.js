
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

  function wraperPatch(o, n) {
    let newContainer = patchfn(o, n)
    lastContainer = newContainer
    return newContainer
  }

  return {
    attach: (vnode$) => {
      window.addEventListener('DOMContentLoaded', function() {
        let container = document.querySelector(selector)
        renderer$ = flyd.scan(wraperPatch, container, vnode$.map(vnode => h('div' + selector, { key: selector }, [vnode])))
      })
    },
    reattach: (vnode$) => {
      renderer$ = flyd.scan(wraperPatch, lastContainer, vnode$.map(vnode => h('div' + selector, { key: selector }, [vnode])))
    },
    dispose: () => {
      renderer$.end(true)
    },
  }
}
