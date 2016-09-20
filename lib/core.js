import style from './utils/style'
import Type from 'union-type'
import F from './utils/composing'

const R = {
  clone: require('ramda/src/clone'),
  evolve: require('ramda/src/evolve'),
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

  if (mDef.actions) {
    mDef.actions._ChildAction = [[String, R.T, Array], (name, update, a, m) => R.evolve({[name]: update(a)}, m)]
    mDef.actions._ChildActionScoped = [[String, String, R.T, Array], (scope, name, update, a, m) => R.evolve({[scope]: R.evolve({ [name]: update(a) })}, m)]
    mDef.Action = {}
    mDef.update = {}
    for (let actionName in mDef.actions) {
      mDef.Action[actionName] = mDef.actions[actionName][0]
      mDef.update[actionName] = mDef.actions[actionName][1]
    }
  }
  mDef.Action = Type(mDef.Action)
  mDef.update = mDef.Action.caseOn(mDef.update)
  if (!mDef.inputs) {
    mDef.inputs = {}
  }
  mDef.inputs._action = (ctx, Action, name, data) => (Action[name].length > 0) ? Action[name](data) : Action[name]()
  mDef.inputs._childAction = (ctx, Action, name, update, a) => Action._ChildAction(name, update, a)
  mDef.inputs._childActionScoped = (ctx, Action, scope, name, update, a) => Action._ChildActionScoped(scope, name, update, a)
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
  if (mDef.modules) {
    let wrappableInit = mDef.init
    mDef.init = (...args) => ({
      ...wrappableInit(...args),
      ...F.mergeModels(mDef.modules),
    })
    let wrappableLoad = mDef.load
    mDef.load = (ctx, i, Action) => ({
      ...wrappableLoad(ctx, i, Action),
      ...F.mergeAll(mDef.modules, i),
    })
  }
  // Scoped composition
  if (mDef.scopedModules) {
    let wrappableInit = mDef.init
    mDef.init = (...args) => {
      let model = wrappableInit(...args)
      for (let scope in mDef.scopedModules) {
        model[scope] = F.mergeModels(mDef.scopedModules[scope])
      }
      return model
    }
    let wrappableLoad = mDef.load
    mDef.load = (ctx, i, Action) => {
      let mds = wrappableLoad(ctx, i, Action)
      for (let scope in mDef.scopedModules) {
        mds[scope] = F.mergeAll(mDef.scopedModules[scope], i, scope)
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
