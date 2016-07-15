const R = require('ramda')
const F = require('../../lib')
const h = F.h


module.exports = F.def({
  init: ({key}) => ({
    key,
    selectedPage: '',
    text: '',
    messages: [],
  }),
  inputs: {
    changePage: (ctx, Action, page) => [
      Action.ChangePage(page),
      ['router', F.router.types.navigateTo(page)],
    ]
  },
  actions: {
    ChangePage: [[String], (page, m) => R.evolve({selectedPage: R.always(page)}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', [
      h('div', {style: styles.title, on: {click: () => i.changePage('')}}, 'Fractal - SimpleRouter'),
      h('div', {style: styles.mainContainer}, [
        h('div', {style: styles.sidemenu.base}, [
          h('div', {style: styles.sidemenu.item, on: {click: () => i.changePage('page0')}}, 'Page 0'),
          h('div', {style: styles.sidemenu.item, on: {click: () => i.changePage('page1')}}, 'Page 1'),
          h('div', {style: styles.sidemenu.item, on: {click: () => i.changePage('page2')}}, 'Page 2'),
        ]),
        h('div', {style: styles.childContainer}, [
          F.router.children(ctx, m),
        ]),
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
