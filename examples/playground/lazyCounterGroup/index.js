const R = require('ramda')
const h = require('snabbdom/h')
const F = require('../../../lib/')

const counter0 = require('./counter0')

module.exports = F.def({

  init: ({key}) => ({
    key,
    counter0: counter0.init({key: 'count0'}),
    moduleName: 'counter0',
    _md: {counter0},
  }),
  inputs: {
    changeModule: (ctx, Action, name) => Action.ChangeModule(name),
    childAction: (ctx, Action, a) => Action.ChildAction(a),
  },
  load: (ctx, i, Action) => {
    return {
      counter0: F.createContext(counter0, {action$: i.childAction}),
    }
  },
  loadAfter: (ctx, i, Action, md) => {
    setTimeout(() => require.ensure([], () => {
      let mds = {
        counter0,
        counter1: require('./counter1'),
        counter2: require('./counter2'),
      }
      ctx.action$(Action.ChargeModule(mds))
      md({
        counter1: F.createContext(mds.counter1, {action$: i.childAction}),
        counter2: F.createContext(mds.counter2, {action$: i.childAction}),
      })
    }), 5000)
  },
  Action: {
    ChangeModule: [String],
    ChildAction: [Array],
    ChargeModule: [Object],
  },
  update: {
    ChangeModule: (name, m) => R.evolve({moduleName: R.always(name)}, m),
    ChildAction: (a, m) => R.evolve({[m.moduleName]: m._md[m.moduleName].update(a)}, m),
    ChargeModule: (mds, m) => R.pipe(
      R.assoc('_md', mds),
      R.merge(R.mapObjIndexed((md, name) => md.init({key: name}), mds)),
    )(m)
  },
  interfaces: {
    view: (ctx, i, m) => { // context, Action and m
      return h('div', {style: {
          key: m.key,
          position: 'relative',
          'padding': '10px 10px 10px 20px',
          margin: '5px',
          'background-color': 'rgb(80, 150, 190)'
        } }, [
        ctx._md[m.moduleName].interfaces.view(m[m.moduleName]),
        h('button', {style: styles.button, on: {click: () => i.changeModule('counter0')}}, '0'),
        h('button', {style: styles.button, on: {click: () => i.changeModule('counter1')}}, '1'),
        h('button', {style: styles.button, on: {click: () => i.changeModule('counter2')}}, '2'),
      ])
    },
  },

})

let styles = {
  button: {},
}
