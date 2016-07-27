const R = require('ramda')
const F = require('../../../lib')
const h = F.h


module.exports = F.def({
  init: ({key}) => ({
    key,
    color: 'black',
  }),
  inputs: {
    toggleColor: (ctx, Action, _) => Action.ToggleColor(),
  },
  actions: {
    ToggleColor: [[], m => R.evolve({color: c => (c == 'black') ? 'blueviolet' : 'black'}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', {key: m.key}, [
      h('div', 'Page 2 :)'),
      h('div', {
        style: {backgroundColor: m.color, color: 'white', padding: '20px'},
        on: {click: i.toggleColor},
      }, 'Omg a toogle color!! Click me!!'),
    ]),
  },
})
