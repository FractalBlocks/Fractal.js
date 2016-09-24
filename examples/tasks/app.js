import R from 'ramda'
// import F from '../../dist/fractal'
import F from '../../lib'
const h = F.h
const setFocusedTask = F.tasks.view.types.setFocused
const readFileTask = F.tasks.file.types.read


let moduleDef = F.def({
  name: 'Main',
  init: ({key}) => ({
    key,
    fileContent: '...',
  }),
  inputs: {
    setFocused: (ctx, Action, selector, focused) => ['view', setFocusedTask(selector, focused, {})],
    readFile: (ctx, Action, file) => ['file', readFileTask(file, {
      success: content => ctx.action$(Action.ChangeFileContent(content)),
    })],
  },
  actions: {
    ChangeFileContent: [[String], (content, m) => R.evolve({fileContent: R.always(content)}, m)],
  },
  interfaces: {
    view: ({styles, _md}, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, [
      h('div', {class: {[styles.task.base]: true}}, [
        'View: ',
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
      h('div', {class: {[styles.task.base]: true}}, [
        'View: ',
        h('input', {
          props: { type: 'file' },
          on: { change: ev => (ev.target.files[0]) ? i.readFile(ev.target.files[0]) : 0 },
        }, 'Focus'),
        h('div', {}, m.fileContent),
      ]),
    ]),
  },
  styles: {
    base: {},
    task: {
      base: {
        display: 'flex',
        alignItems: 'center',
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
