const R = {
  clone: require('ramda/src/clone'),
}
const Type = require('union-type')


let def = moduleDef => {
  let mDef = R.clone(moduleDef)
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
  mDef.inputs._action = (ctx, Action, name, data) => Action[name](data)
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

module.exports = {
  def,
  defineModule: def, // deprected
}
