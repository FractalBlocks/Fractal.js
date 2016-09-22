import R from 'ramda'
import F from '../../../lib'
const h = F.h


let moduleDef = F.def({
  name: 'Submodule0',
  init: ({key, count = 0, hasRemove = false}) => ({
    key,
    hasRemove,
    count,
  }),
  outputNames: ['remove$'],
  actions: {
    Inc: [[], m => R.evolve({count: R.inc}, m)],
    Dec: [[], m => R.evolve({count: R.dec}, m)],
  },
  interfaces: {
    view: ({styles, remove$}, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, [
      h('div', {class: {[styles.counter]: true}}, m.count),
      h('button', {on: { click: i._action('Inc') }}, 'Inc'),
      h('button', {on: { click: i._action('Dec') }}, 'Dec'),
      h('div', {class: {[styles.removeButton.base]: true, [styles.removeButton.hasRemove]: m.hasRemove}, on: { click: remove$ }}, 'X'),
    ]),
  },
  styles: {
    base: {
      display: 'flex',
      alignItems: 'center',
    },
    counter: {
      fontSize: '18px',
      padding: '5px',
      backgroundColor: 'blue',
      borderRadius: '5px',
      color: 'white',
      margin: '4px',
    },
    removeButton: {
      base: {
        display: 'none',
      },
      hasRemove: {
        display: 'block',
      },
    }
  },
})

export default moduleDef

if (module.hot) {
  module.hot.dispose(function() {
    moduleDef.dispose()
  })
}
