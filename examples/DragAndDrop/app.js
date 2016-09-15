const R = require('ramda')
const h = require('snabbdom/h')
const patch = require('snabbdom/snabbdom.js').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/style'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
])
const F = require('../../lib')

let {blocks} = require('./modulos')

let blocksM = blocks('blocks')

module.exports = F.def({
  init: ({key}) => ({
    key,
    blocks: [blocksM.init('block1')],
  }),
  inputs: {
    blockAction: (ctx, Action, block, index) => Action.BlockAction(block, index),
  },
  actions: {
    BlockAction: [[Number, Array], (index, action, m) => R.evolve({ blocks: R.adjust(blocksM.update(action), index) }, m)],
  },
  interfaces: {
    view: (ctx, i, m) => {
      return h('svg', {
          attrs: {
            width: 800,
            height: 800,
          },
        },
        R.addIndex(R.map)((block, idx) => F.createContext(blocksM, {
          action$: i.blockAction(idx),
          remove$: () => i.remove(+idx)
        }).interfaces.view(block), m.blocks)
      )
    },
  }
})
