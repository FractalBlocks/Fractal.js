const R = require('ramda')
const flyd = require('flyd')
const h = require('snabbdom/h')
const F = require('../../../lib/')

const childs = {}


module.exports = F.def({
  init: ({key}) => ({
    key,
  }),
  load: (ctx, i, Action) => {
    return {}
  },
  inputs: {
  },
  actions: {
  },
  interfaces: {
    data: (ctx, i, m) => ({}),
    view: (ctx, i, m) => h('div', {style: styles.base, key: m.key}, [
      h('div', {style: styles.title}, 'Comming soon ...'),
    ]),
  }
})

let styles = {
  base: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  title: {
    fontSize: '30px',
  },
}
