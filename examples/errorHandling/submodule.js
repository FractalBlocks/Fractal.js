import R from 'ramda'
// import F from '../../dist/fractal'
import F from '../../lib'
const h = F.h


export default F.def({
  log: true,
  name: 'Submodule',
  init: ({key}) => ({
    key,
    count: 0,
  }),
  actions: {
    Inc: [[], m => R.evolve({count: R.inc}, m)],
    Dec: [[], m => R.evolve({count: R.dec}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, [
      h('div', {class: {[styles.counter]: true}}, m.count),
      h('button', {on: { click: i._action('Inc') }}, 'Inc'),
      h('button', {on: { click: i._action('Dec') }}, 'Dec'),
    ]),
  },
})

let styles = F.style.rs({
  base: {},
  counter: {
    display: 'inline-block',
    fontSize: '16px',
    margin: '10px',
  },
})
