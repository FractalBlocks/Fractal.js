// self nested counter and counter list
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
let inputNames = ['inc$', 'dec$', 'rst$', 'add$', 'remove$', 'removeAll$', 'resetAll$', 'deepReset$', 'childAction$', 'childInputs$']

let actionCreator = (i, o, action$, Action) => {
  flyd.on(() => action$(Action.Inc()), i.inc$)
  flyd.on(() => action$(Action.Dec()), i.dec$)
  flyd.on(() => action$(Action.Rst()), i.rst$)
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

let init = (key) => ({
  key,
  count: 0,
  childs: [],
})

let Action = Type({
  Inc: [],
  Dec: [],
  Rst: [],
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
  // child related actions
  Add: model => R.evolve({childs: R.append(init(model.childs.length))}, model),
  Remove: (idx, model) => R.evolve({childs: R.remove(idx, 1)}, model),
  RemoveAll: R.evolve({childs: R.always([])}),
  ChildAction: (idx, action, model) => R.evolve({childs: R.adjust(update(action), idx)}, model),
})

let interfaces = {
  view: (i, o, m) => { // inputs, outputs and model
    let childInputs = []
    let vnode = h('div', { key: m.key, style: {
        'padding': '10px 10px 10px 20px',
        margin: '5px',
        'background-color': 'rgb(80, 150, 190)'
      } }, [
      h('button', {on: { click: i.inc$ }}, '+'),
      h('button', {on: { click: i.dec$ }}, '-'),
      h('button', {on: { click: i.rst$ }}, 'reset'),
      h('span', {style: {'margin': '0px 20px 0px 20px', 'font-size': '24px', color: 'white'}}, m.count),
      h('button', {on: { click: o.remove$ }, style: {margin: '0 20px 0 40px', float: 'right'}}, 'X'),
      h('br'),
      h('br'),
      h('button', {on: { click: i.add$ }}, 'add'),
      h('button', {on: { click: i.removeAll$ }}, 'removeAll'),
      h('button', {on: { click: i.resetAll$ }}, 'resetAll'),
      h('button', {on: { click: i.deepReset$ }}, 'deepReset'),
      h('br'),
      h('div', {style: {'padding': '10px 10px 10px 20px', 'background-color': 'white'}}, R.addIndex(R.map)((model, idx) => {
        let inputs = {}
        R.forEach(name => inputs[name] = flyd.stream(), inputNames)
        let outputs = {}
        R.forEach(name => outputs[name] = flyd.stream(), outputNames)
        actionCreator(inputs, outputs, forwardTo(i.childAction$, action => ({action, idx})), Action)
        childInputs.push(inputs)
        // child => parent connections, only in this direction (avoiding infinite loops)
        flyd.on(() => i.remove$(idx), outputs.remove$)
        return interfaces.view(inputs, outputs, model)
      }, m.childs)),
    ])
    // child inputs stream, for a dynamic behavior
    i.childInputs$(childInputs)
    return vnode
  }
}

// outputs
let outputNames = ['remove$']


///// core module ----

// IO streams
let inputs = {}
R.forEach(name => inputs[name] = flyd.stream(), inputNames)
let outputs = {}
R.forEach(name => outputs[name] = flyd.stream(), outputNames)

let action$ = flyd.stream()
let model$ = flyd.scan(R.flip(update), init(), action$)

// action creator
actionCreator(inputs, outputs, action$, Action)


// interfaces
// view
let vnode$ = flyd.map(model => interfaces.view(inputs, outputs, model), model$)

flyd.on(x => console.log(x), action$)


//// view driver module ----
window.addEventListener('DOMContentLoaded', function() {
  let container = document.querySelector('#app')
  let renderer$ = flyd.scan(patch, container, vnode$)
})



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
