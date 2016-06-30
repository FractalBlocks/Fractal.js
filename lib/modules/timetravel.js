const R = {
  T: require('ramda/src/T'),
  evolve: require('ramda/src/evolve'),
  not: require('ramda/src/not'),
  always: require('ramda/src/always'),
  F: require('ramda/src/F'),
  inc: require('ramda/src/inc'),
  ifElse: require('ramda/src/ifElse'),
  update: require('ramda/src/update'),
  append: require('ramda/src/append'),
  mapObjIndexed: require('ramda/src/mapObjIndexed'),
}
const h = require('snabbdom/h')
const F = {...require('../core'), ...require('../utils/helpers')}
const {logAction, displayFromDiff, diff} = require('../utils/logdiff')


let timetravel = (child, log = true) => {

  return F.def({
    init: () => ({
      time: 0,
      active: true,
      playing: false,
      frameTime: 0,
      opened: false,
      state: child.init(),
      history: [{ state: child.init(), timestamp: (new Date()).getTime() }],
    }),
    // inputs
    inputs: {
      toggleTimeTravel: (ctx, Action, _) => ctx.action$(Action.ToggleTimeTravel()),
      setTime: (ctx, Action, time) => ctx.action$(Action.SetTime(time)),
      childAction: (ctx, Action, a) => ctx.action$(Action.ChildAction(a)),
      setActive: (ctx, Action, bool) => ctx.action$(Action.SetActive(bool)),
      clearHistory: (ctx, Action, _) => ctx.action$(Action.ClearHistory()),
      play: (ctx, Action, playing) => ctx.action$(Action.Play(playing)),
      frame: (ctx, Action, _) => ctx.action$(Action.Frame()),
    },
    load: (ctx, i, Action) => {
      return {
        child: F.createContext(child, {action$: (m.active) ? i.childAction : a => {
          if (log) {
            logAction(a)
          }
        }}),
      }
    },
    Action: {
      ToggleTimeTravel: [],
      Frame: [],
      Play: [R.T],
      SetActive: [R.T],
      SetTime: [Number],
      ClearHistory: [],
      ChildAction: [Array],
    },
    update: {
      ToggleTimeTravel: R.evolve({opened: R.not}),
      SetActive: (bool, m) => R.evolve({active: R.always(bool)}, m),
      SetTime: (time, m) => {
        let validTime = time
        if (time >= m.history.length)
          validTime = m.history.length - 1
        else if (time < 0)
          validTime = 0
        let nextState = m.history[validTime].state
        if (log) {
          displayFromDiff(diff(m.state, nextState))
          console.log(nextState)
        }
        return R.evolve({
          active: R.F,
          state: R.always(nextState),
          time: R.always(validTime),
        }, m)
      },
      ClearHistory: m => {
        let step = R.evolve({timestamp: R.always((new Date()).getTime())}, m.history[m.time])
        return R.evolve({
          time: R.always(0),
          state: R.always(step.state),
          history: R.always([step]),
        }, m)
      },
      ChildAction: (action, m) => {
        let evolveFn = R.evolve({
          state: child.update(action),
          timestamp: R.always((new Date()).getTime())
        }, m.history[m.time])
        if (log) {
          logAction(action)
          displayFromDiff(diff(m.state, evolveFn.state))
          console.log(evolveFn.state)
        }
        let newModel = R.evolve({
          time: R.inc,
          state: R.always(evolveFn.state),
          history: R.ifElse(
            h => !!h[m.time + 1], // exist that registry in history?
            R.update(m.time + 1, evolveFn), // rescribe history
            R.append(evolveFn) // create history
          )
        }, m)
        if (newModel.history.length == 2) { // casse for large time witout an update
          newModel.history[0].timestamp = newModel.history[1].timestamp
        }
        return newModel
      },

      Play: (playing, m) => {
        if (playing) {
          if (m.time != m.history.length - 1)
            return R.evolve({
              active: R.F,
              playing: R.T,
              frameTime: R.always(m.history[m.time + 1].timestamp - m.history[m.time].timestamp),
            }, m)
          else
            return R.evolve({
              active: R.F,
              playing: R.F,
            }, m)
        } else {
          return R.evolve({
            active: R.F,
            playing: R.F,
          }, m)
        }
      },
      Frame: m => {
        if (m.time != m.history.length - 1) {
          let frameTime = (m.time < m.history.length - 2) ? R.always(m.history[m.time + 2].timestamp - m.history[m.time + 1].timestamp) : R.always(0)
          let nextState = m.history[m.time + 1].state
          if (log) {
            displayFromDiff(diff(m.state, nextState))
            console.log(nextState)
          }
          return R.evolve({
            active: R.F,
            time: R.inc,
            playing: frameTime >= 0,
            state: R.always(nextState),
            frameTime,
          }, m)
        } else
          return R.evolve({
            active: R.F,
            playing: R.F,
          }, m)
      }
    },
    interfaces: {
      view: (ctx, i, m) => { // inputs, outputs and model
        return h('div', {style: {
            width: '100%',
            height: '100%',
            overflow: 'auto',
          } }, [
          ctx._md.child.interfaces.view(m.history[m.time].state),
          h('button', {
            style: styles.toggleButton,
            on: {click: i.toggleTimeTravel}
          }, 'tt'),
          h('footer', {style: {...styles.base, display: (m.opened) ? 'flex' : 'none'}}, [
            h('div', {style: styles.controls}, [
              h('button', {style: styles.button, on: {click: () => i.setTime(m.time - 1)}}, 'Back'),
              h('button', {style: styles.button, on: {click: () => i.setTime(m.time + 1)}}, 'Forward'),
              h('button', {style: styles.button, on: {click: () => i.setActive(!m.active)}}, (m.active) ? 'Pause' : 'Unpause'),
              h('button', {style: styles.button, on: {click: () => i.clearHistory(undefined)}}, 'Clear history'),
              h('button', {style: styles.button, on: {click: () => i.play(!m.playing)}}, (m.playing) ? 'Pause replay' : 'Replay'),
              h('span', {style: styles.time}, m.time),
            ]),
            h('input', {
              style: styles.slider,
              props: {type: 'range', max: m.history.length - 1, min: 0, value: m.time},
              on: {
                input: ev => i.setTime(parseInt(ev.target.value)),
              },
            })
          ]),
        ])
      },
      // TODO: update this interface mergers
      time: (ctx, i, m) => {
        return {
          timer: {
            periodic: false,
            active: m.playing,
            time: m.frameTime,
            on: i.frame,
          },
          ...(() => { // mergin child interfaces
            let timers = {}
            if (child.interfaces.time) {
              R.mapObjIndexed((obj, name) => {
                timers['child' + name] = obj
                if (!m.active)
                  timers['child' + name].active = false
              }, ctx._md.child.interfaces.time(m.history[m.time].state))
            }
            return timers
          })()
        }
      },
      fetch: (ctx, i, m) => {
        return {
          ...(() => { // mergin child interfaces
            let fetches = {}
            if (child.interfaces.fetch) {
              R.mapObjIndexed((obj, name) => {
                fetches['child' + name] = obj
                if (!m.active)
                  fetches['child' + name].active = false
              }, ctx._md.child.interfaces.fetch(m.history[m.time].state))
            }
            return fetches
          })()
        }
      },
    },

  })
}

module.exports = timetravel

const styles = {
  base: {
    position: 'fixed',
    width: '100%',
    minHeight: '100px',
    bottom: '0px',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    zIndex: '99999',
  },
  toggleButton: {
    position: 'fixed',
    bottom: '0px',
    left: '0px',
    zIndex: '10000',
  },
  controls: {
    width: '100%',
    minHeight: '30px',
    'margin-bottom': '5px',
    display: 'flex',
    flexWrap: 'wrap',
    'justify-content': 'space-around',
  },
  time: {
    float: 'right',
  },
  slider: {
    width: '90%',
  },
}




