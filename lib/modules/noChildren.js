const F = {...require('../core'), ...require('../utils/helpers')}
const h = require('snabbdom/h')


module.exports = F.def({
  init: ({key}) => ({key}),
  inputs: {},
  actions: {},
  interfaces: {
    view: (ctx, i, m) => h('div', 'There are no children'),
  },
})
