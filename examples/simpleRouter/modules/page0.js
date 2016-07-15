const R = require('ramda')
const F = require('../../../lib')
const h = F.h


module.exports = F.def({
  init: ({key}) => ({
    key,
    color: 'green',
  }),
  inputs: {
    toggleColor: (ctx, Action, _) => Action.ToggleColor(),
  },
  actions: {
    ToggleColor: [[], m => R.evolve({color: c => (c == 'green') ? 'blue' : 'green'}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', [
      h('div', 'Page 0 :)'),
      h('div', {
        style: {backgroundColor: m.color, color: 'white', padding: '20px'},
        on: {click: i.toggleColor},
      }, 'Omg a toogling color!! Click me!!'),
    ]),
  },
})
