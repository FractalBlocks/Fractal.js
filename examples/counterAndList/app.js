import R from 'ramda'
import h from 'snabbdom/h'
import F from '../../lib'

import counter from './counter'

// TODO: use F.mergeModels in init
// note that lazy loaded things can't be dinamically composed (and make no sense to do that)
//// self contained module, it contains a list of itself
// counterAndList is a module definition and a constructor
let counterAndList = F.defineModule({
  name: 'counterAndList',
  init: ({key}) => ({
    key,
    time: 0,
    activeCount: true,
    lorempixel: 'fetching',
    loremsrc: {},
    counter0: counter.init({key: 'counter0'}),
    counter1: counter.init({key: 'counter1'}),
    childs: [],
  }),

  inputs: {
    lorempixel: (ctx, Action, blob) => Action.Lorempixel(URL.createObjectURL(blob)),
    lorempixelError: (ctx, Action, _) => Action.LorempixelFail(),
    reload: (ctx, Action, _) => Action.Reload(),
    inc: (ctx, Action, _) => Action.Counter0Action(counter.Action.Inc()),
    tick: (ctx, Action, _) => Action.Tick(),

    add: (ctx, Action, _) => Action.Add(),
    remove: (ctx, Action, idx) => Action.Remove(idx),
    removeAll: (ctx, Action, _) => Action.RemoveAll(),
    resetAll: (ctx, Action, _) => [
      Action.ResetAll(),
      Action.SetActiveAll(),
    ],
    deepReset: (ctx, Action, _) => [
      Action.DeepReset(),
      Action.DeepActiveAll(),
    ],
    deepReload: (ctx, Action, _) => Action.DeepReload(),

    //dynamic childs
    counter0Action: (ctx, Action, a) => Action.Counter0Action(a),
    counter1Action: (ctx, Action, a) => Action.Counter1Action(a),
    childAction: (ctx, Action, idx, a) => Action.ChildAction(idx, a),
  },

  outputNames: ['remove$'],

  load: (ctx, i, Action) => {
    return { // static modules (Note that thay cannot be static child of itself - Infinite recursion)
      counter0: F.createContext(counter, {action$: i.counter0Action}),
      counter1: F.createContext(counter, {action$: i.counter1Action}),
    }
  },
  actions: {
    Reload: [[], R.evolve({lorempixel: R.always('fetching')})],
    SetActiveCount: [[R.T], (bool, m) => R.evolve({activeCount: R.always(bool)}, m)],
    Tick: [[], R.evolve({time: R.inc})],
    Lorempixel: [[String], (objURL, model) => R.evolve({
      lorempixel: R.always('success'),
      loremsrc: R.always(objURL)
    }, model)],
    LorempixelFail: [[], R.evolve({lorempixel: R.always('error')})],
    // child related actions
    Add: [[], model => R.evolve({childs: R.append(counterAndList.init({key: model.childs.length}))}, model)],
    Remove: [[Number], (idx, model) => R.evolve({childs: R.remove(idx, 1)}, model)],
    RemoveAll: [[], R.evolve({childs: R.always([])})],
    ResetAll: [[], model => R.evolve({childs: R.map(R.pipe(
      counterAndList.update(counterAndList.Action.Counter0Action(counter.Action.Rst())),
      counterAndList.update(counterAndList.Action.SetActiveCount(false)),
    ))}, model)],
    SetActiveAll: [[], model => R.evolve({childs: R.map(
      counterAndList.update(counterAndList.Action.SetActiveCount(true))
    )}, model)],
    DeepActiveAll: [[], function deepActiveAll (model) { // recusive examples
      return R.evolve({childs: R.map(
        R.pipe(
          counterAndList.update(counterAndList.Action.SetActiveCount(true)),
          deepActiveAll
        )
      )}, model)
    }],
    DeepReset: [[], function deepReset (model) { // recusive examples
      return R.evolve({childs: R.map(
        R.pipe(
          counterAndList.update(counterAndList.Action.Counter0Action(counter.Action.Rst())),
          counterAndList.update(counterAndList.Action.SetActiveCount(false)),
          deepReset
        )
      )}, model)
    }],
    DeepReload: [[], function deepReload (model) { // recusive examples
      return R.evolve({childs: R.map(
        R.pipe(
          counterAndList.update(counterAndList.Action.Reload()),
          deepReload
        )
      )}, model)
    }],

    // child actions
    Counter0Action: [[Array], (a, m) => R.evolve({counter0: counter.update(a)}, m)],
    Counter1Action: [[Array], (a, m) => R.evolve({counter1: counter.update(a)}, m)],
    ChildAction: [[Number, Array], (idx, action, model) => R.evolve({childs: R.adjust(counterAndList.update(action), idx)}, model)],
  },

  interfaces: {
    view: (ctx, i, m) => { // context, Action and model
      return h('div', {style: {
          position: 'relative',
          'padding': '10px 10px 10px 20px',
          margin: '5px',
          'background-color': 'rgb(80, 150, 190)'
        } }, [
        h('button', {on: { click: ctx.remove$ }, style: {top: '5px', right: '5px', position: 'absolute'}}, 'X'),
        h('div', {style: {display: 'flex'}}, [
          ctx._md.counter0.interfaces.view(m.counter0),
          ctx._md.counter1.interfaces.view(m.counter1),
        ]),
        h('button', {on: { click: i.reload }}, 'reload image'),
        h('span', {style: {'margin': '0px 0px 0px 20px', 'font-size': '24px', color: 'green'}}, m.time),
        (() => {
          if (m.lorempixel == 'fetching')
            return  h('span', {style: {'margin-left': '10px'}}, 'fetching...')
          if (m.lorempixel == 'success')
            return  h('img', {style: {'margin-left': '10px'}, attrs: {src: m.loremsrc}})
          if (m.lorempixel == 'error')
            return  h('span', {style: {'margin-left': '10px'}}, 'error')
        })(),
        h('br'),
        h('br'),
        h('button', {on: { click: i.add }}, 'add'),
        h('button', {on: { click: i.removeAll }}, 'removeAll'),
        h('button', {on: { click: i.resetAll }}, 'resetAll'),
        h('button', {on: { click: i.deepReset }}, 'deepReset'),
        h('button', {on: { click: i.deepReload }}, 'deepReload'),
        h('br'),
        h('div', {style: {'padding': '10px 10px 10px 20px', 'background-color': 'white'}},
          R.addIndex(R.map)((child, idx) => {
            return F.createContext(counterAndList, {action$: i.childAction(+idx), remove$: () => i.remove(+idx)}).interfaces.view(child)
          }, m.childs)
        ),
      ])
    },
    time: (ctx, i, m) => {
      return {
        tick1: {
          periodic: true,
          active: false,//m.time < 10,
          time: 1000,
          on: i.tick,
        },
        tick2: {
          periodic: true,
          active: false,//m.counter0.count < 20 && m.activeCount,
          time: 1000,
          on: i.inc,
        },
        ...F.mergeChilds(m.childs, counterAndList, 'childs', 'time', idx => ({action$: i.childAction(+idx)})),
      }
    },
    fetch: (ctx, i, m) => {
      return {
        lorempixel: {
          url: 'http://lorempixel.com/40/40/?' + (new Date()).getTime(), // avoid caching
          options: {
            method: 'get',
          },
          active: m.lorempixel == 'fetching',
          response: res => res.blob(),
          success: i.lorempixel,
          denied: ctx.lorempixelError$,
          error: ctx.lorempixelError$,
          netError: ctx.lorempixelError$,
        },
        ...F.mergeChilds(m.childs, counterAndList, 'childs', 'fetch', idx => ({action$: i.childAction(+idx)})),
      }
    },
  },

})

export default counterAndList
