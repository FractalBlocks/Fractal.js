import style from './utils/style'
import Type from 'union-type'
import F from './utils/composing'

const R = {
  clone: require('ramda/src/clone'),
  evolve: require('ramda/src/evolve'),
  adjust: require('ramda/src/adjust'),
  append: require('ramda/src/append'),
  remove: require('ramda/src/remove'),
  T: require('ramda/src/T'),
}


let def = moduleDef => {
  let mDef = R.clone(moduleDef)
  mDef.name = (mDef.hasOwnProperty('name')) ? mDef.name : 'UnamedModule'
  mDef.log = (mDef.hasOwnProperty('log')) ? mDef.log : false
  mDef.logAll = (mDef.hasOwnProperty('logAll')) ? mDef.logAll : false

  // 'ns' is the namespace for keyFrames and may be other stuff
  let ns = { animation: {} }
  if (mDef.styles) {
    mDef.styleInstance = style.createStyle(style.styles, mDef.name)
  }
  if (mDef.animations) {
    ns.animations = style.registerAnimations(mDef.name, mDef.styleInstance, mDef.animations)
  }
  if (mDef.styles) {
    mDef.styles = style.rs(mDef.name, mDef.styleInstance, (typeof(mDef.styles) === 'function') ? mDef.styles(ns) : mDef.styles)
    mDef.dispose = () => {
      mDef.styleInstance.Style.remove(mDef.styleInstance.Style)
      mDef.styleInstance.container.remove()
    }
  } else {
    mDef.styles = {}
    mDef.dispose = () => 0
  }

  if (!mDef.actions) {
    mDef.actions = {}
  }
  // default actions
  mDef.actions._ChildAction = [[String, R.T, Array], (name, update, a, m) => R.evolve({[name]: update(a)}, m)]
  mDef.actions._ChildActionScoped = [[String, String, R.T, Array], (scope, name, update, a, m) => R.evolve({[scope]: R.evolve({ [name]: update(a) })}, m)]
  mDef.actions._DynamicChildAction = [[String, R.T, Number, Array], (scope, update, idx, a, m) => R.evolve({[scope]: R.adjust(update(a), idx)}, m)]
  mDef.actions._DynamicChildAdd = [[String, R.T], (scope, initialState, m) => R.evolve({[scope]: R.append(initialState)}, m)]
  mDef.actions._DynamicChildRemove = [[String, Number], (scope, idx, m) => R.evolve({[scope]: R.remove(idx, 1)}, m)]
  mDef.Action = {}
  mDef.update = {}
  for (let actionName in mDef.actions) {
    mDef.Action[actionName] = mDef.actions[actionName][0]
    mDef.update[actionName] = mDef.actions[actionName][1]
  }
  mDef.Action = Type(mDef.Action)
  mDef.update = mDef.Action.caseOn(mDef.update)
  if (!mDef.inputs) {
    mDef.inputs = {}
  }
  // -- default inputs
  // static inputs
  mDef.inputs._action = (ctx, Action, name, data) => (Action[name].length > 0) ? Action[name](data) : Action[name]()
  mDef.inputs._childAction = (ctx, Action, name, update, a) => Action._ChildAction(name, update, a)
  mDef.inputs._childActionScoped = (ctx, Action, scope, name, update, a) => Action._ChildActionScoped(scope, name, update, a)
  // dynamic inputs
  mDef.inputs._dynamicChildAction = (ctx, Action, scope, update, idx, a) => Action._DynamicChildAction(scope, update, idx, a)
  mDef.inputs._dynamicChildAdd = (ctx, Action, scope, initialState) => Action._DynamicChildAdd(scope, initialState)
  mDef.inputs._dynamicChildRemove = (ctx, Action, scope, idx) => Action._DynamicChildRemove(scope, idx)
  if (!mDef.outputNames) {
    mDef.outputNames = []
  }
  if (!mDef.load) {
    mDef.load = (ctx, i, Action) => ({})
  }
  if (!mDef.loadAfter) {
    mDef.loadAfter = (ctx, i, Action, md) => md({})
  }
  // Composition
  if (mDef.modules || mDef.groupedModules || mDef.dynamicModules) {
    let wrappableInit = mDef.init
    mDef.init = (...args) => {
      let state = ({
        ...wrappableInit(...args),
        ...(mDef.modules) ? F.mergeModels(mDef.modules): {},
      })
      if (mDef.groupedModules) {
        for (let scope in mDef.groupedModules) {
          state[scope] = F.mergeModels(mDef.groupedModules[scope])
        }
      }
      if (mDef.dynamicModules) {
        for (let scope in mDef.dynamicModules) {
          if (!state[scope]) {
            state[scope] = []
          }
        }
      }
      return state
    }
    let wrappableLoad = mDef.load
    mDef.load = (ctx, i, Action) => {
      let mds = ({
        ...wrappableLoad(ctx, i, Action),
        ...(mDef.modules) ? F.mergeAll(mDef.modules, i): {},
      })
      if (mDef.groupedModules) {
        for (let scope in mDef.groupedModules) {
          mds[scope] = F.mergeAll(mDef.groupedModules[scope], i, scope)
        }
      }
      if (mDef.dynamicModules) {
        mds.dynamicModules = {}
        for (let scope in mDef.dynamicModules) {
          mds.dynamicModules[scope] = (mDef.dynamicModules[scope].root) ? mDef.dynamicModules[scope].root : mDef.dynamicModules[scope]
        }
      }
      return mds
    }
  }
  mDef.mDef = moduleDef
  return mDef
}

export default {
  def,
}
