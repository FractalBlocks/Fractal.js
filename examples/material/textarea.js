const R = require('ramda')
const h = require('snabbdom/h')
const F = require('../../lib')
const textarea = require('./components/textarea')


//// self contained counter and counterlist
// counterAndList is a module definition and a constructor
let counterAndList = F.def({
  init: () => ({
    value: '',
    focused: false,
    success: false,
    error: false,
  }),

  inputs: {
    (ctx, Action, elm) => Action.Change(elm),
    (ctx, Action, _) => Action.Blur(),
    (ctx, Action, _) => Action.Focus(),
  },

  outputNames: [],

  actions: {
    Change: [[R.T], (text, m) => R.evolve({
      value: R.always(text),
    }, m)],
    Focus: [[], R.evolve({focused: R.T})],
    Blur: [[], R.evolve({focused: R.F})],
  },

  // interface for childs (TODO: memoize)
  amendChilds: (i, o, m) => {
    return m
  },

  interfaces: {
    view: (i, o, m) => { // inputs, outputs and model
      return textarea({
        label: 'Textarea',
        isFocused: m.focused,
        isSuccess: m.success,
        isError: m.error,
        value: m.value,
        onChange: e => i.change$(e.target.value),
        onClick: () => i.click$(undefined),
        onBlur: () => i.blur$(undefined),
      })
    },
  },

})

module.exports = counterAndList
