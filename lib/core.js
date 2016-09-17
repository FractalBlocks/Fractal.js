import style from './utils/style'
import Type from 'union-type'

const R = {
  clone: require('ramda/src/clone'),
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
  if (!mDef.outputNames) {
    mDef.outputNames = []
  }
  if (!mDef.load) {
    mDef.load = (ctx, Action) => ({})
  }
  if (!mDef.loadAfter) {
    mDef.loadAfter = (ctx, i, Action, md) => md({})
  }
  mDef.mDef = moduleDef
  return mDef
}

export default {
  def,
}
