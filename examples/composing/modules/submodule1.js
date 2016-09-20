import R from 'ramda'
import F from '../../../lib'
const h = F.h


let moduleDef = F.def({
  name: 'Submodule1',
  init: ({key}) => ({
    key,
    count: 0,
  }),
  actions: {
    Inc: [[], m => R.evolve({count: R.inc}, m)],
    Dec: [[], m => R.evolve({count: R.dec}, m)],
  },
  interfaces: {
    view: ({styles}, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, [
      h('div', {class: {[styles.counter]: true}}, m.count),
      h('button', {on: { click: i._action('Inc') }}, 'Inc'),
      h('button', {on: { click: i._action('Dec') }}, 'Dec'),
    ]),
  },
  styles: {
    base: {},
    counter: {
      display: 'inline-block',
      fontSize: '18px',
      padding: '5px',
      backgroundColor: 'grey',
      borderRadius: '5px',
      color: 'white',
      margin: '4px',
    },
  },
})

export default moduleDef

if (module.hot) {
  module.hot.dispose(function() {
    moduleDef.dispose()
  })
}
