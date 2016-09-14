const F = {...require('../core').default, ...require('../utils/helpers').default}
const h = require('snabbdom/h')


export default F.def({
  init: ({key}) => ({key}),
  inputs: {},
  actions: {},
  interfaces: {
    view: (ctx, i, m) => h('div', 'There are no children'),
  },
})
