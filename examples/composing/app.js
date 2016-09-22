import R from 'ramda'
import F from '../../lib'
const h = F.h

import modules from './modules'
import buildedModules from './buildedModules'
import buildedDynamicMds from './dynamicModules'


let moduleDef = F.def({
  logAll: true,
  name: 'Main',
  // inserted to model directly
  modules: {
    ...modules,
    m0: buildedModules.submodule0,
    m1: buildedModules.submodule1,
    m2: buildedModules.submodule2,
  },
  groupedModules: { // inserted into model via keys (e.g. contact form modules)
    childMds: modules,
    formMds: modules,
    buildedMds: buildedModules,
  },
  dynamicModules: {
    dynamic0Md: modules.submodule0,
    dynamic1Md: modules.submodule1,
    dynamic2Md: modules.submodule2,
    buildedDynamicMd0: buildedDynamicMds.submodule0,
    buildedDynamicMd1: buildedDynamicMds.submodule0,
    buildedDynamicMd2: buildedDynamicMds.submodule0,
  }, // inserted at runtime
  init: ({key}) => ({
    key,
    isActive: false,
    dynamic0Md: [100, 23, 2].map((count, idx) => modules.submodule0.init({key: idx, count, hasRemove: true})),
    dynamic1Md: [100, 23, 2].map((count, idx) => modules.submodule0.init({key: idx, count, hasRemove: true})),
    dynamic2Md: [100, 23, 2].map((count, idx) => modules.submodule0.init({key: idx, count, hasRemove: true})),
    buildedDynamicMd0: [100, 23, 2].map((count, idx) => modules.submodule0.init({key: idx, count})),
    buildedDynamicMd1: [100, 23, 2].map((count, idx) => modules.submodule0.init({key: idx, count})),
    buildedDynamicMd2: [100, 23, 2].map((count, idx) => modules.submodule0.init({key: idx, count})),
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
      // individual modules
      _md.submodule0.interfaces.view(m.submodule0),
      _md.submodule1.interfaces.view(m.submodule1),
      _md.submodule2.interfaces.view(m.submodule2),
      // mergeList
      ...F.mergeList(['m0', 'm1', 'm2'], _md, 'view',
        (childView, name) => h('div', {class: {[styles.mergedListView]: true}}, [name, childView])
      , m),
      // mapped modules
      h('div', {class: {[styles.childView.base]: true}},
        F.mergeGroup('childMds', _md, 'view',
          childView => h('div', {class: {[styles.childView.item]: true}}, [childView])
        , m),
      ),
      h('div', {class: {[styles.childView.base]: true}},
        F.mergeGroup('formMds', _md, 'view',
          childView => h('div', {class: {[styles.childView.item]: true}}, [childView])
        , m),
      ),
      h('div', {class: {[styles.childView.base]: true}},
        F.mergeGroup('buildedMds', _md, 'view',
          childView => h('div', {class: {[styles.childView.item]: true}}, [childView])
        , m),
      ),
      h('div', {class: {[styles.dynamicModules.base]: true}},
        ['dynamic0Md', 'dynamic1Md', 'dynamic2Md'].map(name => h('div', {class: {[styles.dynamicModules.subcontainer]: true}}, [
          h('div', {class: {[styles.dynamicModules.subcontainerName]: true}}, [
            h('button', {
              class: {[styles.dynamicModules.addButton]: true},
              on: { click: () => i._dynamicChildAdd(name, _md.dynamicModules[name].init({key: m[name].length, count: 3, hasRemove: true})) }
            }, '+'),
            name,
          ]),
          ...F.mergeDynamicList(name, i, _md, 'view',
            childView => h('div', {class: {[styles.dynamicModules.item]: true}}, [childView])
          , m),
        ]))
      ),
      h('div', {class: {[styles.dynamicModules.base]: true}},
        ['buildedDynamicMd0', 'buildedDynamicMd1', 'buildedDynamicMd2'].map(name => h('div', {class: {[styles.dynamicModules.subcontainer]: true}}, [
          h('div', {class: {[styles.dynamicModules.subcontainerName]: true}}, [
            h('button', {
              class: {[styles.dynamicModules.addButton]: true},
              on: { click: () => i._dynamicChildAdd(name, _md.dynamicModules[name].init({key: m[name].length, count: 3})) }
            }, '+'),
            name,
          ]),
          ...F.mergeDynamicList(name, i, _md, 'view',
            childView => h('div', {class: {[styles.dynamicModules.item]: true}}, [childView])
          , m),
        ]))
      ),
    ]),
  },
  styles: {
    base: {
      overflow: 'auto',
      padding: '10px',
    },
    mergedListView: {
      display: 'flex',
      alignItems: 'center',
    },
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
    dynamicModules: {
      base: {
        margin: '7px',
        display: 'flex',
      },
      subcontainer: {
        margin: '7px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
      addButton: {},
      subcontainerName: {
        textAlign: 'center',
        padding: '3px',
        fontSize: '18px',
      },
      items: {
        margin: '8px',
        padding: '5px 10px 5px 5px',
        border: '2px solid #09727B',
        borderRadius: '8px',
      },
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
