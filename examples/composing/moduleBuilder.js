// Example of a prametrized module (a module builder)

import R from 'ramda'
import F from '../../lib'
const h = F.h


export default ({color, hasRemove}) => F.def({
  name: 'Submodule0',
  init: ({key, count = 0, hasRemove = false}) => ({
    key,
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
      h('div', {class: {[styles.removeButton.base]: true, [styles.removeButton.hasRemove]: hasRemove}, on: { click: remove$ }}, 'X'),
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
      backgroundColor: color,
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
