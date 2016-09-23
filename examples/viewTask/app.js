import R from 'ramda'
// import F from '../../dist/fractal'
import F from '../../lib'
const h = F.h
const setFocusedTask = F.tasks.view.types.setFocused


let moduleDef = F.def({
  name: 'Main',
  init: ({key}) => ({key}),
  inputs: {
    setFocused: (ctx, Action, selector, focused) => ['view', setFocusedTask(selector, focused, {})],
  },
  interfaces: {
    view: ({styles, _md}, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, [
      h('button', {
        on: { click: () => i.setFocused('.target-input', true) },
      }, 'Focus'),
      h('button', {
        on: { click: () => i.setFocused('.target-input', false) },
      }, 'Blur'),
      h('input.target-input', {
        props: { value: 'Target' },
      }),
    ]),
  },
  styles: {
    base: {},
    button: {},
  },
})

export default moduleDef

if (module.hot) {
  module.hot.dispose(function() {
    moduleDef.dispose()
  })
}
