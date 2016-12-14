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
    view: ({ styles }, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, [
      'Hello ',
      h('span', {class: {[styles.highlight]: true}}, 'Mr. Dev'),
    ]),
  },
  styles: {
    base: {
      padding: '20px',
      fontSize: '34px',
      color: '#6F1B9F',
    },
    highlight: {
      padding: '0 10px',
      color: 'white',
      backgroundColor: '#078701',
    },
  },
})
