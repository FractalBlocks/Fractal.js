import flyd from 'flyd'
const R = {
  mapObjIndexed: require('ramda/src/mapObjIndexed'),
  clone: require('ramda/src/clone'),
  map: require('ramda/src/map'),
  merge: require('ramda/src/merge'),
  curryN: require('ramda/src/curryN'),
  equals: require('ramda/src/equals'),
  dissoc: require('ramda/src/dissoc'),
}


let connectInterface = (md, name, state, connections) =>
  (md.interfaces[name]) ? merge(md, connections).interfaces[name](state) : {}


// childModuleDefsObj -> childModuleModelsObj via mDef_key -> mDef_value.init({key: mDef_key})
// or via root mDef_key -> mDef_value.root.init({key: mDef_key, ...mDef_value[key]})
let mergeModels = mds => {
  let obj = {}
  for (let key in mds) {
    obj[key] = (mds[key].root) ? mds[key].root.init({key, ...R.dissoc('root', mds[key])}) : mds[key].init({key})
  }
  return obj
}

/* Merge child interfaces, flatten
  childs : Array[Object]
  interfaceName : String
  scope : String // use scope if use this function uses two or more times in an interface
*/
let mergeChilds = (childs, md, scope = '', interfaceName, connections) => {
  let objs = {}
  R.mapObjIndexed((state, idx) => {
    R.mapObjIndexed((obj, name) => {
      objs[scope + idx + '_' + name] = obj
    }, connectInterface(md, interfaceName, state, connections(+idx)))
  }, childs)
  return objs
}

let mergeChild = (state, md, scope, interfaceName, connections) => {
  let objs = {}
  R.mapObjIndexed((obj, name) => {
    objs[scope + '_' + name] = obj
  }, connectInterface(md, interfaceName, state, connections))
  return objs
}

function addModuleInfo(mDef, obj) {
  obj._moduleName = mDef.name
  obj._log = mDef.log
  obj._logAll = mDef.logAll
  return obj
}

// Composition for Fractal core, (mDefinition, connections = {}) -> ContextualizedModule
let merge = (mDefinition, connections = {}) => {
  let mDef = R.clone(mDefinition)

  let ctx = {
    action$: flyd.stream(),
    task$: flyd.stream(),
    styles: (!!mDef.styles) ? mDef.styles : {},
  }
  ctx.dispatch$ = tasks => {
    if (tasks != undefined && tasks instanceof Array) {
      if (tasks.of == undefined && typeof(tasks[0]) !== 'string') {
        // verify that is not a task in the form [String, TaskAction]
        // multiple action-task syntax
        tasks.forEach(t => {
          if (R.equals(t.of, mDef.Action)) {
            ctx.action$(t)
          } else {
            ctx.task$(t)
          }
        })
      } else if (R.equals(tasks.of, mDef.Action)) {
        // single action syntax for an action
        ctx.action$(tasks)
      } else if (tasks instanceof Array) {
        // single action syntax for a task
        ctx.task$(tasks)
      }
    } else {
      // none sense return
      // ctx.task$('undefined') // DEBUG
    }
  }
  // append the outputs in the context
  for (let name in mDef.outputNames) {
    ctx[mDef.outputNames[name]] = flyd.stream()
  }

  // connection with the context
  for (let name in connections) {
    if (!!ctx[name]) {
      if (name === 'action$') {
        flyd.on(d => connections[name](addModuleInfo(mDef, d)), ctx[name])
      } else {
        flyd.on(connections[name], ctx[name])
      }
    }
  }

  // contextualize inputs
  let inputs = R.map(i => R.curryN(i.length, function(...args) {
    // wrapper function for tasks
    let tasks = i(...args)
    ctx.dispatch$(tasks)
  })(ctx, mDef.Action), mDef.inputs)
  ctx._md = mDef.load(ctx, inputs, mDef.Action) || {}

  // connect task$
  connectTasksToModules(ctx._md)

  function connectTasksToModules(mds) {
    function connectTasks(md) {
      if (md.mDef) {
        flyd.on(task => ctx.task$(addModuleInfo(mDef, task)), md.ctx.task$)
      } else {
        // connect categorized modules
        for (let subName in md) {
          flyd.on(task => ctx.task$(addModuleInfo(mDef, task)), md[subName].ctx.task$)
        }
      }
    }
    function connectTasksToModules_func(mds) {
      for (let name in mds) {
        if (mds[name].mDef) {
          connectTasks(mds[name])
        } else if (!name === 'dynamicModules') {
          connectTasksToModules_func(mds[name])
        }
      }
    }
    return connectTasksToModules_func(mds)
  }

  let md = (mds) => {
    // connect task$
    connectTasksToModules(mds)
    ctx._md = R.merge(ctx._md, mds)
  }
  setTimeout(() => mDef.loadAfter(ctx, inputs, mDef.Action, md), 0)
  // contextualize interfaces
  mDef.interfaces = R.map(i => R.curryN(3, i)(ctx)(inputs), mDef.interfaces)

  return {
    ...mDef,
    ctx,
    inputs,
  }
}

// merge a list of modules
let mergeList = (moduleNames, _md, interfaceName, f = interfaceObj => interfaceObj, rootModel) =>
 R.map(name => f(_md[name].interfaces[interfaceName](rootModel[name]), name), moduleNames)

 // merge a list of groups
let mergeGroup = (groupName, _md, interfaceName, f = interfaceObj => interfaceObj, rootModel) => {
  let moduleNames = Object.keys(rootModel[groupName])
  return R.map(name => f(_md[groupName][name].interfaces[interfaceName](rootModel[groupName][name]), name), moduleNames)
}

let mapObjToArray = (fn, obj) => {
  let arr = []
  for (let key in obj)
    arr.push(fn(obj[key], key))
  return arr
}

// TODO: implement funtion that takes [list] -> ( (key, value) -> ({key, value}) ) -> {[key]: value}
// Useful for optional styles

let mergeAll = (childDefs, i, scope = '', connectionsFn = (md, name) => ({})) => {
  let connectionsMiddleFn = (connections, md, name) => {
    if (!connections.action$) {
      if (scope == '') {
        connections.action$ = i._childAction(name, md.update)
      } else {
        connections.action$ = i._childActionScoped(scope, name, md.update)
      }
    }
    return connections
  }
  return R.mapObjIndexed((md, name) => {
    let _module = (md.root) ? md.root : md
    merge(_module, connectionsMiddleFn(connectionsFn(_module, name), _module, name))
  }, childDefs)
}

let mergeDynamicList = (scope, i, mds, interfaceName, interfaceFn = (md, idx) => view, m) => {
  return m[scope].map((item, idx) => {
    return interfaceFn(merge(mds.dynamicModules[scope], {
      action$: i._dynamicChildAction(scope, mds.dynamicModules[scope].update, idx),
      remove$: () => i._dynamicChildRemove(scope, idx),
    }).interfaces[interfaceName](item), idx)
  })
}


export default {
  merge,
  mergeAll,
  mergeDynamicList,
  mergeModels,
  mergeList,
  mergeGroup,
  addModuleInfo,
// TODO: review the next
  mergeChild,
  mergeChilds,
  connectInterface,
  mapObjToArray,
}
