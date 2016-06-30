const R = require('ramda')
const flyd = require('flyd')
const forwardTo = require('flyd-forwardto')
const h = require('snabbdom/h')
const F = require('../../dist/fractalEngine.min.js')


//// self contained counter and counterlist
// counterAndList is a module definition and a constructor
let counterAndList = F.defineModule({
  // inputs
  inputNames: [
    'inc$', 'dec$', 'rst$', 'reload$', // module
    'add$', 'remove$', 'removeAll$', 'resetAll$', 'deepReset$', 'deepReload$', 'childAction$', 'childInputs$', // child
    'tick$', // time
    'lorempixel$', 'lorempixelError$' // fetch
  ],

  // outputs
  outputNames: ['remove$'],

  actionCreator: (i, o, action$, Action) => {
    flyd.on(() => action$(Action.Inc()), i.inc$)
    flyd.on(() => action$(Action.Dec()), i.dec$)
    flyd.on(() => action$(Action.Rst()), i.rst$)
    flyd.on(() => action$(Action.Reload()), i.reload$)

    flyd.on(() => action$(Action.Tick()), i.tick$)
    flyd.on(blob => action$(Action.Lorempixel(URL.createObjectURL(blob))), i.lorempixel$)
    flyd.on(() => action$(Action.LorempixelFail()), i.lorempixelError$)
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
      listeners[2] = flyd.on(() => {
        action$(Action.Reload())
        childInputs.forEach(inputs => {
          inputs.deepReload$(undefined)
        })
      }, i.deepReload$)
      return listeners
    }, [], i.childInputs$)
  },

  init: () => ({
    time: 0,
    count: 0,
    lorempixel: 'fetching',
    loremsrc: {},
    childs: [],
  }),

  Action: {
    Inc: [],
    Dec: [],
    Rst: [],
    Reload: [],

    Tick: [],
    Github: [],
    GithubFail: [],
    Lorempixel: [String],
    LorempixelFail: [],
    // child actions
    Add: [],
    Remove: [Number],
    RemoveAll: [],
    ChildAction: [Number, Array],
  },

  update: {
    Inc: R.evolve({count: R.inc}),
    Dec: R.evolve({count: R.dec}),
    Rst: R.evolve({count: R.always(0)}),
    Reload: R.evolve({lorempixel: R.always('fetching')}),

    Tick: R.evolve({time: R.inc}),
    Lorempixel: (objURL, model) => R.evolve({
      lorempixel: R.always('success'),
      loremsrc: R.always(objURL)
    }, model),
    LorempixelFail: R.evolve({lorempixel: R.always('error')}),

    // child related actions
    Add: model => R.evolve({childs: R.append(counterAndList.init())}, model),
    Remove: (idx, model) => R.evolve({childs: R.remove(idx, 1)}, model),
    RemoveAll: R.evolve({childs: R.always([])}),
    ChildAction: (idx, action, model) => R.evolve({childs: R.adjust(counterAndList.update(action), idx)}, model),
  },

  // interface for childs (TODO: memoize)
  amendChilds: (i, o, model) => {
    let childInputs = []
    let amendedModel = R.evolve({
      childs: R.addIndex(R.map)((model, idx) => {
        let child = counterAndList.create() // create a new counterAndList module
        child.actionCreator(child.inputs, child.outputs, forwardTo(i.childAction$, action => ({action, idx})), child.Action)
        childInputs.push(child.inputs)
        // child => parent connections, only in this direction (avoiding infinite loops)
        flyd.on(() => i.remove$(idx), child.outputs.remove$)
        let amendedChildModel = child.amendChilds(child.inputs, child.outputs, model)
        return R.merge(amendedChildModel, {i: child.inputs, o: child.outputs})
      })
    }, model)

    // child inputs stream, for a dynamic behavior
    i.childInputs$(childInputs)

    return amendedModel
  },

  interfaces: {
    view: (i, o, m) => { // inputs, outputs and model
      return h('div', {style: {
          'padding': '10px 10px 10px 20px',
          margin: '5px',
          'background-color': 'rgb(80, 150, 190)'
        } }, [
        h('button', {on: { click: i.inc$ }}, '+'),
        h('button', {on: { click: i.dec$ }}, '-'),
        h('button', {on: { click: i.rst$ }}, 'reset'),
        h('button', {on: { click: i.reload$ }}, 'reload image'),
        h('span', {style: {'margin': '0px 20px 0px 20px', 'font-size': '24px', color: 'white'}}, m.count),
        h('span', {style: {'margin': '0px 0px 0px 20px', 'font-size': '24px', color: 'green'}}, m.time),
        (() => {
          if (m.lorempixel == 'fetching')
            return  h('span', {style: {'margin-left': '10px'}}, 'fetching...')
          if (m.lorempixel == 'success')
            return  h('img', {style: {'margin-left': '10px'}, attrs: {src: m.loremsrc}})
          if (m.lorempixel == 'error')
            return  h('span', {style: {'margin-left': '10px'}}, 'error')
        })(),
        h('button', {on: { click: o.remove$ }, style: {margin: '0 20px 0 40px', float: 'right'}}, 'X'),
        h('br'),
        h('br'),
        h('button', {on: { click: i.add$ }}, 'add'),
        h('button', {on: { click: i.removeAll$ }}, 'removeAll'),
        h('button', {on: { click: i.resetAll$ }}, 'resetAll'),
        h('button', {on: { click: i.deepReset$ }}, 'deepReset'),
        h('button', {on: { click: i.deepReload$ }}, 'deepReload'),
        h('br'),
        h('div', {style: {'padding': '10px 10px 10px 20px', 'background-color': 'white'}},
          R.map(model => counterAndList.interfaces.view(model.i, model.o, model), m.childs)
        ),
      ])
    },
    time: (i, o, m) => {
      return {
        tick1: {
          periodic: true,
          active: m.time < 10,
          time: 1000,
          on: i.tick$,
        },
        tick2: {
          periodic: true,
          active: m.count < 20,
          time: 1000,
          on: i.inc$,
        },
        ...(() => {
          let timers = {}
          R.mapObjIndexed((model, idx) => {
            R.mapObjIndexed((obj, name) => {
              timers['child' + idx + name] = obj
            }, counterAndList.interfaces.time(model.i, model.o, model))
          }, m.childs)
          return timers
        })()
      }
    },
    fetch: (i, o, m) => {
      return {
        lorempixel: {
          url: 'http://lorempixel.com/40/40/?' + (new Date()).getTime(), // avoid caching
          options: {
            method: 'get',
          },
          active: m.lorempixel == 'fetching',
          response: res => res.blob(),
          success: i.lorempixel$,
          denied: i.lorempixelError$,
          error: i.lorempixelError$,
          netError: i.lorempixelError$,
        },
        ...(() => {
          let fetches = {}
          R.mapObjIndexed((model, idx) => {
            R.mapObjIndexed((obj, name) => {
              fetches['child' + idx + name] = obj
            }, counterAndList.interfaces.fetch(model.i, model.o, model))
          }, m.childs)
          return fetches
        })()
      }
    },
  },

})

module.exports = counterAndList
