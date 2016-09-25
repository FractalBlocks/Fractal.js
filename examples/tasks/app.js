import R from 'ramda'
// import F from '../../dist/fractal'
import F from '../../lib'
const h = F.h
const setFocusedTask = F.tasks.view.types.setFocused
const addWindowListenerTask = F.tasks.view.types.addWindowListener
const removeWindowListenerTask = F.tasks.view.types.removeWindowListener
const readFileTask = F.tasks.file.types.read


// TODO: add an example of fetch task
// TODO: add examles of data, emitter and value tasks

// TODO: put this function in view helpers
let getRelativePosition = (element, ev) => ({
  x: ev.pageX - element.offsetLeft,
  y: ev.pageY - element.offsetTop,
})

let moduleDef = F.def({
  name: 'Main',
  init: ({key}) => ({
    key,
    fileContent: '...',
    greenBox: {
      dragging: false,
      x: 10,
      y: 10,
    },
    purpleBox: {
      dragging: false,
      x: 120,
      y: 100,
    },
  }),
  inputs: {
    setFocused: (ctx, Action, selector, focused) => ['view', setFocusedTask(selector, focused, {})],
    readFile: (ctx, Action, file) => ['file', readFileTask(file, {
      success: content => ctx.action$(Action.ChangeFileContent(content)),
    })],
    startDragging: (ctx, Action, name, ev, boxPos) => {
      let element = ev.target, parent = element.parentElement
      let evPos = getRelativePosition(parent, ev)
      let startPos = {
        x: evPos.x - boxPos.x,
        y: evPos.y - boxPos.y,
      }
      let listener = ev => {
        let position = getRelativePosition(parent, ev)
        ctx.action$(Action.MoveBox(name, {
          x: position.x - startPos.x,
          y: position.y - startPos.y,
        }))
      }
      let stopDragging = () => {
        ctx.dispatch$([
          ['view', removeWindowListenerTask('mousemove', listener)],
          ['view', removeWindowListenerTask('mousemove', stopDragging)],
          Action.EndDragging(name),
        ])
      }
      return [
        ['view', addWindowListenerTask('mousemove', listener)],
        ['view', addWindowListenerTask('mouseup', stopDragging)],
        Action.StartDragging(name),
      ]
    },
  },
  actions: {
    ChangeFileContent: [[String], (content, m) => R.evolve({fileContent: R.always(content)}, m)],
    MoveBox: [[String, R.T], (name, position, m) => R.evolve({[name]: R.evolve({
      x: R.always(position.x),
      y: R.always(position.y),
    })}, m)],
    StartDragging: [[String, R.T], (name, m) => R.evolve({[name]: R.evolve({
      dragging: R.T,
    })}, m)],
    EndDragging: [[String], (name, m) => R.evolve({[name]: R.evolve({
      dragging: R.F,
    })}, m)],
  },
  interfaces: {
    view: ({styles, _md}, i, m) => h('div', {key: m.key, class: {[styles.base]: true}}, [
      h('div', {class: {[styles.task.base]: true}}, [
        'View: ',
        h('button', {
          class: {[styles.task.button]: true},
          on: { click: () => i.setFocused('.target-input', true) },
        }, 'Focus'),
        h('button', {
          class: {[styles.task.button]: true},
          on: { click: () => i.setFocused('.target-input', false) },
        }, 'Blur'),
        h('input.target-input', {
          props: { value: 'Target' },
        }),
      ]),
      h('div', {class: {[styles.task.base]: true}}, [
        'View - WindowListener: ',
        h('div', {
          class: {[styles.task.canvas.base]: true},
          props: { type: 'file' },
        }, [
          h('div', {class: {[styles.task.canvas.container]: true}}, [
            h('div', {
              class: {[styles.task.canvas.box]: true, [styles.task.canvas.greenBox]: true},
              style: { transform: `translate(${m.greenBox.x}px, ${m.greenBox.y}px)` },
              on: {
                mousedown: ev => i.startDragging('greenBox', ev, { x: m.greenBox.x, y: m.greenBox.y }),
              },
            }, 'Drag me!!'),
            h('div', {
              class: {[styles.task.canvas.box]: true, [styles.task.canvas.purpleBox]: true},
              style: { transform: `translate(${m.purpleBox.x}px, ${m.purpleBox.y}px)` },
              on: {
                mousedown: ev => i.startDragging('purpleBox', ev, { x: m.purpleBox.x, y: m.purpleBox.y }),
              },
            }, 'Drag me!!'),
          ]),
        ]),
      ]),
      h('div', {class: {[styles.task.base]: true}}, [
        'File - readFile: ',
        h('input', {
          class: {[styles.task.input]: true},
          props: { type: 'file' },
          on: { change: ev => (ev.target.files[0]) ? i.readFile(ev.target.files[0]) : 0 },
        }, 'Focus'),
        h('div', {class: {[styles.task.fileContent]: true}}, m.fileContent),
      ]),
    ]),
  },
  styles: {
    base: {
      padding: '20px',
    },
    task: {
      base: {
        display: 'flex',
        alignItems: 'center',
        margin: '10px',
      },
      button: {
        margin: '5px',
      },
      input: {
        margin: '5px',
      },
      fileContent: {
        width: '400px',
        height: '200px',
        overflow: 'auto',
        border: '3px solid black',
        borderRadius: '4px',
      },
      canvas: {
        base: {
          width: '400px',
          height: '400px',
          border: '4px solid black',
          overflow: 'hidden',
        },
        container: {
          position: 'relative',
        },
        box: {
          width: '100px',
          height: '100px',
          color: 'white',
          fontSize: '22px',
          borderRadius: '10px',
          ...F.style.absoluteCenter,
          // dragable properties
          position: 'absolute',
          transition: 'transform 0.1s',
          cursor: 'move',
          ...F.style.noSelectable,
        },
        greenBox: {
          backgroundColor: 'green',
        },
        purpleBox: {
          backgroundColor: 'purple',
        },
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
