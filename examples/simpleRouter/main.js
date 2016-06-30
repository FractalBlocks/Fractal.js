const R = require('ramda')
const F = require('../../lib')
const h = F.h


module.exports = ({child = F.nochild, props = {}}) => F.def({
  init: ({key}) => ({
    key,
    selectedPage: -1,
    text: '',
    messages: [],
    childState: child.init({key: 'child'}),
  }),
  inputs: {
    changePage: (ctx, Action, page) => Action.ChangePage(page),
    childInput: (ctx, Action, a) => Action.ChildAction(a),
  },
  load: (ctx, i, Action) => {
    return {
      child: F.createContext(child, {action$: i.childInput}),
    }
  },
  actions: {
    ChangePage: [[Number], (page, m) => R.evolve({selectedPage: R.always(page)}, m)],
    ChildAction: [[Array], (a, m) => R.evolve({childState: child.update(a)}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', [
      h('div', {style: styles.title}, 'Fractal - SimpleRouter'),
      h('div', {style: styles.mainContainer}, [
        h('div', {style: styles.sidemenu.base}, [
          h('div', {style: styles.sidemenu.item, on: {click: () => i.changePage(0)}}, 'Page 0'),
          h('div', {style: styles.sidemenu.item, on: {click: () => i.changePage(1)}}, 'Page 1'),
          h('div', {style: styles.sidemenu.item, on: {click: () => i.changePage(2)}}, 'Page 2'),
          h('div', {style: styles.sidemenu.item, on: {click: () => i.changePage(3)}}, 'Page 3'),
        ]),
        h('div', {style: styles.childContainer}, [ctx._md.child.interfaces.view(m.childState)]),
      ]),
    ]),
  },
})


let styles = {
  title: {
    ...F.css.noSelectable,
    cursor: 'pointer',
    fontFamily: 'cursive',
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'purple',
    marginLeft: '10px',
  },
  mainContainer: {
    margin: '15px',
  },
  childContainer: {
    margin: '15px',
  },
  sidemenu: {
    base: {},
    item: {},
  },
}
