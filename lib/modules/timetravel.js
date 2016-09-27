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
const F = {...require('../core').default, ...require('../utils/composing').default}
import logAction from '../utils/logdiff'


let timetravel = (child, log = true) => {

  return F.def({
    logAll: true,
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
        child: F.createContext(child, {action$: (s.active) ? i.childAction : a => {
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
      SetActive: (bool, s) => R.evolve({active: R.always(bool)}, s),
      SetTime: (time, s) => {
        let validTime = time
        if (time >= s.history.length)
          validTime = s.history.length - 1
        else if (time < 0)
          validTime = 0
        let nextState = s.history[validTime].state
        return R.evolve({
          active: R.F,
          state: R.always(nextState),
          time: R.always(validTime),
        }, s)
      },
      ClearHistory: s => {
        let step = R.evolve({timestamp: R.always((new Date()).getTime())}, s.history[s.time])
        return R.evolve({
          time: R.always(0),
          state: R.always(step.state),
          history: R.always([step]),
        }, s)
      },
      ChildAction: (action, s) => {
        let evolveFn = R.evolve({
          state: child.update(action),
          timestamp: R.always((new Date()).getTime())
        }, s.history[s.time])
        let newState = R.evolve({
          time: R.inc,
          state: R.always(evolveFn.state),
          history: R.ifElse(
            h => !!h[s.time + 1], // exist that registry in history?
            R.update(s.time + 1, evolveFn), // rescribe history
            R.append(evolveFn) // create history
          )
        }, s)
        if (newState.history.length == 2) { // casse for large time witout an update
          newState.history[0].timestamp = newState.history[1].timestamp
        }
        return newState
      },

      Play: (playing, s) => {
        if (playing) {
          if (s.time != s.history.length - 1)
            return R.evolve({
              active: R.F,
              playing: R.T,
              frameTime: R.always(s.history[s.time + 1].timestamp - s.history[s.time].timestamp),
            }, s)
          else
            return R.evolve({
              active: R.F,
              playing: R.F,
            }, s)
        } else {
          return R.evolve({
            active: R.F,
            playing: R.F,
          }, s)
        }
      },
      Frame: s => {
        if (s.time != s.history.length - 1) {
          let frameTime = (s.time < s.history.length - 2) ? R.always(s.history[s.time + 2].timestamp - s.history[s.time + 1].timestamp) : R.always(0)
          let nextState = s.history[s.time + 1].state
          return R.evolve({
            active: R.F,
            time: R.inc,
            playing: frameTime >= 0,
            state: R.always(nextState),
            frameTime,
          }, s)
        } else
          return R.evolve({
            active: R.F,
            playing: R.F,
          }, s)
      }
    },
    interfaces: {
      view: (ctx, i, s) => { // inputs, outputs and state
        return h('div', {style: {
            width: '100%',
            height: '100%',
            overflow: 'auto',
          } }, [
          ctx._md.child.interfaces.view(s.history[s.time].state),
          h('button', {
            style: styles.toggleButton,
            on: {click: i.toggleTimeTravel}
          }, 'tt'),
          h('footer', {style: {...styles.base, display: (s.opened) ? 'flex' : 'none'}}, [
            h('div', {style: styles.controls}, [
              h('button', {style: styles.button, on: {click: () => i.setTime(s.time - 1)}}, 'Back'),
              h('button', {style: styles.button, on: {click: () => i.setTime(s.time + 1)}}, 'Forward'),
              h('button', {style: styles.button, on: {click: () => i.setActive(!s.active)}}, (s.active) ? 'Pause' : 'Unpause'),
              h('button', {style: styles.button, on: {click: () => i.clearHistory(undefined)}}, 'Clear history'),
              h('button', {style: styles.button, on: {click: () => i.play(!s.playing)}}, (s.playing) ? 'Pause replay' : 'Replay'),
              h('span', {style: styles.time}, s.time),
            ]),
            h('input', {
              style: styles.slider,
              props: {type: 'range', max: s.history.length - 1, min: 0, value: s.time},
              on: {
                input: ev => i.setTime(parseInt(ev.target.value)),
              },
            })
          ]),
        ])
      },
      // TODO: update this interface mergers
      time: (ctx, i, s) => {
        return {
          timer: {
            periodic: false,
            active: s.playing,
            time: s.frameTime,
            on: i.frame,
          },
          ...(() => { // mergin child interfaces
            let timers = {}
            if (child.interfaces.time) {
              R.mapObjIndexed((obj, name) => {
                timers['child' + name] = obj
                if (!s.active)
                  timers['child' + name].active = false
              }, ctx._md.child.interfaces.time(s.history[s.time].state))
            }
            return timers
          })()
        }
      },
      fetch: (ctx, i, s) => {
        return {
          ...(() => { // mergin child interfaces
            let fetches = {}
            if (child.interfaces.fetch) {
              R.mapObjIndexed((obj, name) => {
                fetches['child' + name] = obj
                if (!s.active)
                  fetches['child' + name].active = false
              }, ctx._md.child.interfaces.fetch(s.history[s.time].state))
            }
            return fetches
          })()
        }
      },
    },

  })
}

export default timetravel

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




