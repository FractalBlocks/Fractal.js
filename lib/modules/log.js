// This module is deprecated, should be deleted on 0.2.0 (TODO DEPRECATED)

const F = {...require('../core').default, ...require('../utils/helpers').default}
const {logAction, displayFromDiff, diff} = require('../utils/logdiff').default

// TODO a more elegant form of do that?
let log = (child) => {

  // merge child interfaces
  let interfaces = {}
  for (let name in child.interfaces) {
    interfaces[name] = (ctx, i, m) => {
      return ctx._md.child.interfaces[name](m)
    }
  }

  return F.def({
    name: child.name,
    init: child.init,
    inputs: {
      childActionLOGER1234: (ctx, Action, action) => Action.ChildActionLOGER1234(action),
      ...child.mDef.inputs,
    },
    outputNames: child.outputNames,
    load: (ctx, i, Action) => {
      let connections = {}
      child.outputNames.forEach(conn => connections[conn] = ctx[conn])
      return {
        child: F.createContext(child, {
          action$: i.childActionLOGER1234,
          ...connections,
        }),
      }
    },
    loadAfter: child.mDef.loadAfter,
    Action: {
      ChildActionLOGER1234: [Array],
      ...child.mDef.Action,
    },
    update: {
      ...child.mDef.update,
      ChildActionLOGER1234: (action, m) => {
        let newModel = child.update(action, m)
        logAction(action)
        displayFromDiff(diff(m, newModel))
        console.log(newModel)
        return newModel
      },

    },
    interfaces,
  })

}

export default log
