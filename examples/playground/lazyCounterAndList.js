import R from 'ramda'
import h from 'snabbdom/h'
import F from '../../lib'
import counterGroup from './lazyCounterGroup'
import counter from './counter'
import imageSet from './imageSet'
import counterAndList from './counterAndList'

const fetchTask = F.tasks.fetch.types.fetch

// TODO: use F.mergeModels in init
// note that lazy loaded things can't be dinamically composed (and make no sense to do that)
//// self contained module, it contains a list of itself
// counterAndList is a module definition and a constructor

export default F.def({
  name: 'lazyCounterAndList',
  init: () => ({
    time: 0,
    counterGroup: counterGroup.init({key: 'counterGroup'}),
    counter0: counter.init({key: 'counter0'}),
    counter1: counter.init({key: 'counter1'}),
    imageSet: imageSet.init({key: 'imageSet'}),
    activeCount: true,
    lorempixel: 'fetching',
    loremsrc: {},
    childs: [],
  }),
  inputs: {
    fetchImage: (ctx, Action, _) => [
      Action.Reload(),
      [
        'fetch',
        fetchTask({
          url: 'https://unsplash.it/40/40?random',
          options: {
            method: 'get',
          },
          response: res => res.blob(),
          success: blob => ctx.action$(Action.Lorempixel(URL.createObjectURL(blob))),
          denied: () => ctx.action$(Action.LorempixelFail()),
          error: () => ctx.action$(Action.LorempixelFail()),
          netError: () => ctx.action$(Action.LorempixelFail()),
        })
      ]
    ],
    inc: (ctx, Action, d) => Action.Counter0Action(counter.Action.Inc()),
    tick: (ctx, Action, d) => Action.Tick(),

    add: (ctx, Action, d) => Action.Add(),
    remove: (ctx, Action, idx) => Action.Remove(idx),
    removeAll: (ctx, Action, d) => Action.RemoveAll(),
    resetAll: (ctx, Action, d) => [
      Action.ResetAll(),
      Action.SetActiveAll()
    ],
    deepReset: (ctx, Action, d) => [
      Action.DeepReset(),
      Action.DeepActiveAll()
    ],
    deepReload: (ctx, Action, d) => Action.DeepReload(),

    //static childs
    counterGroup: (ctx, Action, a) => Action.CounterGroupAction(a),
    counter0Action: (ctx, Action, a) => Action.Counter0Action(a),
    counter1Action: (ctx, Action, a) => Action.Counter1Action(a),
    imageSetAction: (ctx, Action, a) => Action.ImageSetAction(a),
    //dynamic childs
    childAction: (ctx, Action, idx, a) => Action.ChildAction(idx, a),
  },
  outputNames: ['remove$'],
  load: (ctx, i, Action) => {
    i.fetchImage(undefined)
    return { // static modules (Note that thay cannot be static child of itself - Infinite recursion)
      counterGroup: F.createContext(counterGroup, {action$: i.counterGroup}),
      counter0: F.createContext(counter, {action$: i.counter0Action}),
      counter1: F.createContext(counter, {action$: i.counter1Action}),
      imageSet: F.createContext(imageSet, {action$: i.imageSetAction}),
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
    CounterGroupAction: [[Array], (a, m) => R.evolve({counterGroup: counterGroup.update(a)}, m)],
    Counter0Action: [[Array], (a, m) => R.evolve({counter0: counter.update(a)}, m)],
    Counter1Action: [[Array], (a, m) => R.evolve({counter1: counter.update(a)}, m)],
    ImageSetAction: [[Array], (a, m) => R.evolve({imageSet: imageSet.update(a)}, m)],
    ChildAction: [[Number, Array], (idx, action, model) => R.evolve({childs: R.adjust(counterAndList.update(action), idx)}, model)],
  },
  interfaces: {
    view: (ctx, i, m) => { // context, inputs and model
      return h('div', {key: m.key, style: {
          position: 'relative',
          'padding': '10px 10px 10px 20px',
          margin: '5px',
          'background-color': 'rgb(80, 150, 190)',
        } }, [
        h('button', {on: { click: ctx.remove$ }, style: {top: '5px', right: '5px', position: 'absolute'}}, 'X'),
        h('div', {style: {display: 'flex'}}, [
          ctx._md.counter0.interfaces.view(m.counter0),
          ctx._md.counter1.interfaces.view(m.counter1),
          ctx._md.imageSet.interfaces.view(m.imageSet),
          ctx._md.counterGroup.interfaces.view(m.counterGroup),
        ]),
        h('button', {on: { click: i.fetchImage }}, 'reload image'),
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
            let a = 0
            return F.createContext(counterAndList, {action$: i.childAction(+idx), task$: ctx.task$, remove$: () => i.remove(+idx)}).interfaces.view(child)
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
  },
})
