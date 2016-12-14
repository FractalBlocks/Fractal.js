const flyd = require('flyd')
const R = require('ramda')


export default function stateChange() {

  let _states = {
    // stateAny: {
    //   state: {},
    //   do: () => 0,
    // }
  }

  function setStates(states) {

    for (let stateName in states) {
      let parts = stateName.split('_')
      let name = parts[parts.length - 1]
      if (_states[name]) {
        _states[name].last = _states[name].current
      } else {
        _states[name] = { last: {} }
      }
      if (_states[name].current && !R.equals(_states[name].current.state, states[stateName].state)) {
        states[stateName].do(_states[name].current.state, states[stateName].state)
      }
      _states[name].current = states[stateName]
    }

  }

  return {
    listener$: null,
    attach: function (event$) {
      this.listener$ = flyd.on(setStates, event$)
    },
    reattach: function (event$) {
      this.listener$ = flyd.on(setStates, event$)
    },
    dispose: function () {
      this.listener$.end(true)
    },
    get: function() { return _statestes },
    set: function(states) {
      _states = states
    },
  }
}
