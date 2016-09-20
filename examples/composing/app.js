import R from 'ramda'
import F from '../../lib'
const h = F.h

import modules from './modules'


let moduleDef = F.def({
  logAll: true,
  name: 'Main',
  modules, // inserted to model directly
  groupedModules: { // inserted into model via keys (e.g. formModules)
    childs: modules,
    formModules: modules,
  },
  dynamicModules: {
    dynamic0: modules.submodule0,
    dynamic1: modules.submodule1,
    dynamic2: modules.submodule2,
  }, // inserted at runtime
  init: ({key}) => ({
    key,
    isActive: false,
    dynamic0: [
      { count: 100 },
      { count: 23 },
      { count: 2 },
    ],
  }),
  actions: {
    Toggle: [[], R.evolve({isActive: R.not})],
  },
  interfaces: {
    view: ({ styles, _md }, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, [
      h('div', {
        class: {
          [styles.button.base]: true,
          [styles.button.active]: m.isActive,
        },
        on: {
          click: i._action('Toggle'),
        },
      }, (m.isActive) ? 'nice!! :)' : 'Click me!!'),
      // individual childs
      _md.submodule0.interfaces.view(m.submodule0),
      _md.submodule1.interfaces.view(m.submodule1),
      _md.submodule2.interfaces.view(m.submodule2),
      // mapped childs
      h('div', {class: {[styles.childView.base]: true}},
        F.mergeChildList(['submodule0', 'submodule1', 'submodule2'], 'view',
          childView => h('div', {class: {[styles.childView.item]: true}}, [childView])
        , _md.childs, m.childs),
      ),
      h('div', {class: {[styles.childView.base]: true}},
        F.mergeChildList(['submodule0', 'submodule1', 'submodule2'], 'view',
          childView => h('div', {class: {[styles.childView.item]: true}}, [childView])
        , _md.formModules, m.formModules),
      ),
      h('div', {class: {[styles.dynamicChilds.base]: true}},
        F.mergeDynamicList('dynamic0', i, _md, 'view', (childView, idx) => childView, m),
      ),
    ]),
  },
  styles: {
    base: {},
    childView: {
      base: {
        display: 'flex',
      },
      item: {
        margin: '8px',
        padding: '5px 10px 5px 5px',
        border: '2px solid #09727B',
        borderRadius: '8px',
      },
    },
    dynamicChilds: {
      base: {},
      items: {},
    },
    button: {
      base: {
        width: '280px',
        height: '70px',
        margin: '20px',
        fontSize: '38px',
        borderRadius: '35px',
        color: 'white',
        backgroundColor: '#13A513',
        textAlign: 'center',
        transition: 'transform 0.4s',
        cursor: 'pointer',
        ...F.style.absoluteCenter,
        ...F.style.noSelectable,
        '&:hover': {
          color: 'white',
          backgroundColor: 'purple',
          border: '3px solid purple',
          transform: 'perspective(1px) scale(1.1)',
        },
      },
      active: {
        color: 'purple',
        backgroundColor: '#FBFBFB',
        border: '3px solid #13A513',
      },
    },
  },
})

export default moduleDef

if (module.hot) {
  module.hot.dispose(function() {
    moduleDef.dispose()
  })
}
