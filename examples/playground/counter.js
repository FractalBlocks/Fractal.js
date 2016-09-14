import R from 'ramda'
import h from 'snabbdom/h'
import F from '../../lib'


export default F.def({
  init: () => ({
    count: 0,
  }),
  inputs: {
    inc: (ctx, Action, m) => Action.Inc(),
    rst: (ctx, Action, m) => Action.Rst(),
    dec: (ctx, Action, m) => Action.Dec(),
  },
  actions: {
    Inc: [[], R.evolve({count: R.inc})],
    Dec: [[], R.evolve({count: R.dec})],
    Rst: [[], R.evolve({count: R.always(0)})],
  },
  // side connections
  interfaces: {
    view: (ctx, i, m) => h('div', {style: styles.base}, [
      h('div', {style: styles.count}, m.count),
      h('button', {style: styles.button, on: {click: i.inc}}, 'Inc'),
      h('button', {style: styles.button, on: {click: i.rst}}, 'Rst'),
      h('button', {style: styles.button, on: {click: i.dec}}, 'Dec'),
    ]),
  }
})

let styles = {
  base: {
    margin: '5px',
    width: '117px',
    height: '46px',
    padding: '2px',
    color: 'white',
    backgroundColor: 'rgb(80, 150, 190)',
    border: '1px solid blue',
  },
  count: {
    fontSize: '16px',
    textAlign: 'center',
  },
  button: {},
}
