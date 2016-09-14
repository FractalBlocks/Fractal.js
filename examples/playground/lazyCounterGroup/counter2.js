import R from 'ramda'
import h from 'snabbdom/h'
import F from '../../../lib'


export default F.def({
  // state stuff
  init: ({key}) => ({
    key,
    count: 2,
  }),
  actions: {
    Inc: [[], R.evolve({count: R.inc})],
    Dec: [[], R.evolve({count: R.dec})],
    Rst: [[], R.evolve({count: R.always(0)})],
  },
  // side connections
  interfaces: {
    view: (ctx, i, m) => h('div', {style: styles.base}, [
      h('div', {style: styles.count}, m.count),
      h('button', {style: styles.button, on: {click: i._action('Inc')}}, 'Inc'),
      h('button', {style: styles.button, on: {click: i._action('Rst')}}, 'Rst'),
      h('button', {style: styles.button, on: {click: i._action('Dec')}}, 'Dec'),
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
