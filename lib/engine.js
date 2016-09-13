const R = {
  pipe: require('ramda/src/pipe'),
  flip: require('ramda/src/flip'),
  equals: require('ramda/src/equals'),
}
const flyd = require('flyd')
const Type = require('union-type')
const {logAction, displayFromDiff, diff} = require('./utils/logdiff')
const Helpers = require('./utils/helpers')
// const e = require('./utils/exceptions') // DEPRECATED!!!
const timetravel = require('./modules/timetravel')

// Attach architecture to the main module
let run = engineDef => {

  let ctx, model$, driverStreams = {}, module
  let middleUpdatesArr = [], middleware = engineDef.middleware || {}

  for (let key in middleware) {
    middleUpdatesArr.push(middleware[key])
  }

  // TODO: Document that middleware can slow programs
  let middleUpdates = (middleUpdatesArr.length == 0) ? m => m : R.pipe.apply(this, middleUpdatesArr)

  let moduleDef = (engineDef.timetravel) ? timetravel(engineDef.root) : engineDef.root

  let attach = (model) => { // model is used for webpack HMR

    module = Helpers.createContext(moduleDef)
    ctx = module.ctx

    model$ = flyd.scan((m, a) => middleUpdates(module.update(a, m)), middleUpdates((model) ? model : module.init({key: 'mainModule'})), ctx.action$) // state

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
    flyd.on(task => {
      if (engineDef.tasks[task[0]]) {
        engineDef.tasks[task[0]].run(task[1])
      } else {
        console.warn(`There are no handler for ${task[0]} task, sended by ${task._modulePath} module`)
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


  let dispose = () => {
    ctx.action$.end(true)
    ctx.task$.end(true)
    model$.end(true)
    for (let driverName in driverStreams) {
      driverStreams[driverName].end(true)
      engineDef.drivers[driverName].dispose()
    }
  }

  let reattach = (reModule) => {
    dispose()
    // TODO: this can be optimized for hot realoading with a diff-patch algorithm
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

module.exports = {
  run,
  createEngine: run, // deprecated
}
