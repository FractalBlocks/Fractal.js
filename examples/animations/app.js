import R from 'ramda'
import F from '../../lib'
const h = F.h


let moduleDef = F.def({
  name: 'Main',
  init: ({key}) => ({
    key,
    isActive: false,
  }),
  actions: {},
  interfaces: {
    view: ({styles, _md}, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, [
      h('div', {class: {[styles.box.base]: true}}),
    ]),
  },
  animations: {
    box: {
      from: { left: '10px', top: '10px' },
      '25%': { left: '200px', top: '10px' },
      '50%': { left: '200px', top: '100px' },
      '75%': { left: '10px', top: '100px' },
      to: { left: '10px', top: '10px' },
    },
    box: {
      from: { left: '10px', top: '10px' },
      '25%': { left: '200px', top: '10px' },
      '50%': { left: '200px', top: '100px' },
      '75%': { left: '10px', top: '100px' },
      to: { left: '10px', top: '10px' },
    },
  },
  styles: ns => ({
    base: {
      width: '100%',
      height: '100%',
      position: 'relative',
    },
    box: {
      base: {
        position: 'absolute',
        width: '20px',
        height: '20px',
        margin: '20px',
        borderRadius: '50%',
        backgroundColor: '#13A513',
        animation: `2.5s ${ns.animations.box} infinite`,
      },
    },
  }),
})

export default moduleDef

if (module.hot) {
  module.hot.dispose(function() {
    moduleDef.dispose()
  })
}
