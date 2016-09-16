import flyd from 'flyd'
import Type from 'union-type'
import { logAction, displayFromDiff, diff, actionModuleInfo } from './utils/logdiff'
import Helpers from './utils/helpers'
import timetravel from './modules/timetravel'
import style from './utils/style'

const R = {
  pipe: require('ramda/src/pipe'),
  equals: require('ramda/src/equals'),
}

// Attach architecture to the main module
let run = engineDef => {

  let ctx, model$, driverStreams = {}, module
  let middleUpdatesArr = [], middleware = engineDef.middleware || {}, log = engineDef.log || false
  engineDef.logAll = (engineDef.hasOwnProperty('logAll')) ? engineDef.logAll : false

  for (let key in middleware) {
    middleUpdatesArr.push(middleware[key])
  }

  // TODO: Document that middleware can slow programs
  let middleUpdates = (middleUpdatesArr.length == 0) ? m => m : R.pipe.apply(this, middleUpdatesArr)

  let moduleDef = (engineDef.timetravel) ? timetravel(engineDef.root) : engineDef.root

  let attach = model => { // model is used for webpack HMR

    module = Helpers.createContext(moduleDef)
    ctx = module.ctx

    function log(m, newModel, action = { _initial: true, _log: engineDef.log || engineDef.logAll, _moduleName: module.name }) {
      let actionInfo = actionModuleInfo(action)
      if (engineDef.log && actionInfo.log || engineDef.logAll) {
        if (!action._initial) {
          logAction(action)
          displayFromDiff(diff(m, newModel))
        } else {
          console.log('%c Fractal is initializing your app.', 'color: purple; font-size: 14px')
          console.log('%c Model computed ...', 'color: purple; font-size: 14px')
          console.log('%c Connecting machines to external world ...', 'color: purple; font-size: 14px')
          console.log('%c Done. Have a nice day!! :)', 'color: purple; font-size: 14px')
        }
        console.log(newModel)
      }
      return newModel
    }

    model$ = flyd.scan((m, a) => log(m, middleUpdates(module.update(a, m)), Helpers.addModuleInfo(module, a)), log({}, middleUpdates((model) ? model : module.init({key: 'mainModule'}))), ctx.action$) // state

    // automerge services
    if (!engineDef.tasks) {
      engineDef.tasks = {}
    }
    if (!engineDef.drivers) {
      engineDef.drivers = {}
    }
    for (let serviceName in engineDef.services) {
      for (let taskName in engineDef.services[serviceName].tasks) {
        if (taskName == '_') {
          engineDef.tasks[serviceName] = engineDef.services[serviceName].tasks[taskName]
        } else {
          engineDef.tasks[`${serviceName}_${taskName}`] = engineDef.services[serviceName].tasks[taskName]
        }
      }
      for (let driverName in engineDef.services[serviceName].drivers) {
        if (driverName == '_') {
          engineDef.drivers[serviceName] = engineDef.services[serviceName].drivers[driverName]
        } else {
          engineDef.drivers[`${serviceName}_${driverName}`] = engineDef.services[serviceName].drivers[driverName]
        }
      }
    }

    // connect tasks handlers to interfaces
    flyd.on(t => {
      let task = Helpers.addModuleInfo(t)
      if (engineDef.tasks[task[0]]) {
        engineDef.tasks[task[0]].run(task[1])
      } else if (engineDef.log && task._log || engineDef.logAll) {
        console.warn(`There are no handler for ${task[0]} task, sended by ${task._moduleName} module`)
      }
    }, ctx.task$)

    // attach drivers to interfaces
    for (let driverName in engineDef.drivers) {
      if (module.interfaces[driverName]) {
        // TODO: evaluate error handling, maybe an error$ stream
        // driverStreams[driverName] =
        //   flyd.map(model => e('driverExecution', {name: driverName, model}, () => module.interfaces[driverName](model)), model$)
        driverStreams[driverName] = flyd.map(module.interfaces[driverName], model$)
        if (model) {
          engineDef.drivers[driverName].reattach(driverStreams[driverName])
        } else {
          engineDef.drivers[driverName].attach(driverStreams[driverName])
        }
      }
    }
  }


  let disposeConnections = () => {
    ctx.action$.end(true)
    ctx.task$.end(true)
    model$.end(true)
    for (let driverName in driverStreams) {
      driverStreams[driverName].end(true)
      engineDef.drivers[driverName].dispose()
    }
  }

  let dispose = () => {
    disposeConnections()
    style.dispose()
  }

  let reattach = (reModule) => {
    // TODO: this can be optimized for hot realoading with a diff-patch algorithm
    disposeConnections()
    let newModel = (R.equals(moduleDef.init({key: 'mainModule'}), reModule.init({key: 'mainModule'}))) ? model$() : reModule.init({key: 'mainModule'})
    moduleDef = reModule
    attach(newModel)
  }

  attach()

  return {
    ctx,
    inputs: module.inputs,
    tasks: engineDef.tasks,
    drivers: engineDef.drivers,
    reattach,
    dispose,
  }
}

export default {
  run,
}
