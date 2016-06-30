/* Added
	- amendChilds
	- time driver
*/

// import 'whatwg-fetch'

const R = require('ramda')
const flyd = require('flyd')
const forwardTo = require('flyd-forwardto')
const Type = require('union-type')
const patch = require('snabbdom').init([
  require('snabbdom/modules/class'),
  require('snabbdom/modules/attributes'),
  require('snabbdom/modules/props'),
  require('snabbdom/modules/eventlisteners'),
  require('snabbdom/modules/style'),
])
const h = require('snabbdom/h')

//// main module ----- self contained counter and counterlist

// inputs
let inputNames = [
  'inc$', 'dec$', 'rst$', // module
  'add$', 'remove$', 'removeAll$', 'resetAll$', 'deepReset$', 'childAction$', 'childInputs$', // child
  'tick$', // time
  'github$', 'lorempixel$' // fetch
]

let actionCreator = (i, o, action$, Action) => {
  flyd.on(() => action$(Action.Inc()), i.inc$)
  flyd.on(() => action$(Action.Dec()), i.dec$)
  flyd.on(() => action$(Action.Rst()), i.rst$)

  flyd.on(() => action$(Action.Tick()), i.tick$)
  flyd.on(() => action$(Action.Github()), i.github$)
  flyd.on(() => action$(Action.Lorempixel()), i.lorempixel$)
  // child related acs
  flyd.on(() => action$(Action.Add()), i.add$)
  flyd.on(idx => action$(Action.Remove(idx)), i.remove$)
  flyd.on(idx => action$(Action.RemoveAll()), i.removeAll$)
  flyd.on(ch => action$(Action.ChildAction(ch.idx, ch.action)), i.childAction$)
  // child dinamic inputs handling
  flyd.scan((listeners, childInputs) => {
    listeners.forEach(l => l.end(true))
    listeners[0] = flyd.on(() => childInputs.forEach(inputs => inputs.rst$(undefined)), i.resetAll$)
    listeners[1] = flyd.on(() => {
      action$(Action.Rst())
      childInputs.forEach(inputs => {
        inputs.deepReset$(undefined)
      })
    }, i.deepReset$)
    return listeners
  }, [], i.childInputs$)
}

let init = () => ({
  time: 0,
  count: 0,
  childs: [],
})

let Action = Type({
  Inc: [],
  Dec: [],
  Rst: [],

  Tick: [],
  // child actions
  Add: [],
  Remove: [Number],
  RemoveAll: [],
  ChildAction: [Number, Array],
})

let update = Action.caseOn({
  Inc: R.evolve({count: R.inc}),
  Dec: R.evolve({count: R.dec}),
  Rst: R.evolve({count: R.always(0)}),
  
  Tick: R.evolve({time: R.inc}),
  // child related actions
  Add: model => R.evolve({childs: R.append(init())}, model),
  Remove: (idx, model) => R.evolve({childs: R.remove(idx, 1)}, model),
  RemoveAll: R.evolve({childs: R.always([])}),
  ChildAction: (idx, action, model) => R.evolve({childs: R.adjust(update(action), idx)}, model),
})

// interface for childs
let amendChilds = (i, o, model) => {
  let childInputs = []
  let amendedModel = R.evolve({
    childs: R.addIndex(R.map)((model, idx) => {
      let inputs = {}
      R.forEach(name => inputs[name] = flyd.stream(), inputNames)
      let outputs = {}
      R.forEach(name => outputs[name] = flyd.stream(), outputNames)
      actionCreator(inputs, outputs, forwardTo(i.childAction$, action => ({action, idx})), Action)
      childInputs.push(inputs)
      // child => parent connections, only in this direction (avoiding infinite loops)
      flyd.on(() => i.remove$(idx), outputs.remove$)
      let amendedChildModel = amendChilds(inputs, outputs, model)
      return R.merge(amendedChildModel, {i: inputs, o: outputs})
    })
  }, model)

  // child inputs stream, for a dynamic behavior
  i.childInputs$(childInputs)

  return amendedModel
}

let interfaces = {
  view: (i, o, m) => { // inputs, outputs and model
    return h('div', {key: m.key, style: {
        'padding': '10px 10px 10px 20px',
        margin: '5px',
        'background-color': 'rgb(80, 150, 190)'
      } }, [
      h('button', {on: { click: i.inc$ }}, '+'),
      h('button', {on: { click: i.dec$ }}, '-'),
      h('button', {on: { click: i.rst$ }}, 'reset'),
      h('span', {style: {'margin': '0px 20px 0px 20px', 'font-size': '24px', color: 'white'}}, m.count),
      h('span', {style: {'margin': '0px 0px 0px 20px', 'font-size': '24px', color: 'green'}}, m.time),
      h('button', {on: { click: o.remove$ }, style: {margin: '0 20px 0 40px', float: 'right'}}, 'X'),
      h('br'),
      h('br'),
      h('button', {on: { click: i.add$ }}, 'add'),
      h('button', {on: { click: i.removeAll$ }}, 'removeAll'),
      h('button', {on: { click: i.resetAll$ }}, 'resetAll'),
      h('button', {on: { click: i.deepReset$ }}, 'deepReset'),
      h('br'),
      h('div', {style: {'padding': '10px 10px 10px 20px', 'background-color': 'white'}},
        R.map(model => interfaces.view(model.i, model.o, model), m.childs)
      ),
    ])
  },
  time: (i, o, m) => {
    return {
      tick1: {
        periodic: true,
        enabled: m.time < 10,
        time: 1000,
        on: i.tick$,
      },
      tick2: {
        periodic: true,
        enabled: m.count < 20,
        time: 1000,
        on: i.inc$,
      },
      ...(() => { // TODO: allows scope-nested timers
        let timers = {}
        R.mapObjIndexed((model, idx) => {
          R.mapObjIndexed((props, name) => {
            timers['child' + idx + name] = props
          }, interfaces.time(model.i, model.o, model))
        }, m.childs)
        return timers
      })()
    }
  },
}

// outputs
let outputNames = ['remove$']





///// core module ----
amendChilds = R.curry(amendChilds)

let action$ = flyd.stream()
// IO streams
let inputs = {}
R.forEach(name => inputs[name] = flyd.stream(), inputNames)
let outputs = {}
R.forEach(name => outputs[name] = flyd.stream(), outputNames)

actionCreator(inputs, outputs, action$, Action)
let model$ = flyd.map( // amended state
  amendChilds(inputs, outputs),
  flyd.scan(R.flip(update), init('app'), action$) // state
)
// action creator

let d = x => {console.log(x);return x}
// interfaces
// view
let vnode$ = flyd.map(model => interfaces.view(inputs, outputs, model), model$)

// time
let time$ = flyd.map(model => interfaces.time(inputs, outputs, model), model$)


flyd.on(x => console.log(x), model$)


//// view driver module ----
window.addEventListener('DOMContentLoaded', function() {
  let container = document.querySelector('#app')
  let renderer$ = flyd.scan(patch, container, vnode$)
})

//// time driver module ----
let stateNames = ['pending', 'running', 'paused']
let timerPatch = (timeData, obj) => {
  // TODO: Do a better implementation of this driver
  let id = timeData.id
  if (obj.periodic) {
    if (obj.enabled && obj.enabled != timeData.enabled) {
      id = setInterval(() => obj.on(timeData), obj.time)
    } else if (!obj.enabled && obj.enabled != timeData.enabled) {
      clearInterval(id)
      id = null
    } else if (obj.time != timeData.time) {
      clearInterval(id)
      id = setInterval(() => obj.on(timeData), obj.time)
    } else if (id && obj.periodic != timeData.periodic) {
      clearTimeout(id)
      id = setInterval(() => obj.on(timeData), obj.time)
    }
  } else {
    if (obj.enabled && obj.enabled != timeData.enabled) {
      id = setTimeout(() => obj.on(timeData), obj.time)
    } else if (!obj.enabled && obj.enabled != timeData.enabled) {
      clearTimeout(id)
      id = null
    } else if (obj.time != timeData.time) {
      clearTimeout(id)
      id = setTimeout(() => obj.on(timeData), obj.time)
    } else if (obj.periodic != timeData.periodic) {
      clearInterval(id)
      id = setTimeout(() => obj.on(timeData), obj.time)
    }
  }
  return {
    id,
    periodic: obj.periodic,
    enabled: obj.enabled,
    time: obj.time,
    on: obj.on,
    state: obj.state,
  }
}

let timerListPatch = (lastList, list) => {
  // dispose removed timers
  for (var name in lastList) {
    if (!list[name]) {
      if (lastList[name].periodic)
        clearInterval(lastList[name].id)
      else
        clearTimeout(lastList[name].id)
    }
  }

  return R.mapObjIndexed((obj, name) => timerPatch(lastList[name] || {}, obj), list)
}

flyd.scan(timerListPatch, {}, time$)

document.getElementById('button').addEventListener('click', () => inputs.inc$(undefined))


// If hot module replacement is enabled
/*if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./app.js', (comp) => {
    // Mutate the variable holding our component
    //let component = require('./app.js')('app')
    // Render view in the case that any view functions has changed
    //engine.reattach(component)
  })
}*/


