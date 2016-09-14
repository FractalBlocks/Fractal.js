import R from 'ramda'
import h from 'snabbdom/h'
import F from '../../lib'


export default F.def({
  name: 'Chat',
  init: ({key}) => ({
    key,
  }),
  inputs: {
  },
  actions: {
  },
  interfaces: {
    view: (ctx, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, ['Hello']),
  },
})

let styles = F.style.rs({
  base: {},
})
