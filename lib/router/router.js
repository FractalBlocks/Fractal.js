// fractal-router based on react-router (https://github.com/reactjs/react-router/blob/master/docs/Introduction.md)
const F = {...require('../core'), ...require('../utils/helpers')}
const R = {
  mapObjIndexed: require('ramda/src/mapObjIndexed'),
  evolve: require('ramda/src/evolve'),
  always: require('ramda/src/always'),
}
const addressbar = require('addressbar')
const urlMapper = require('url-mapper')

// TODO: inyeccion de datos con router, esto seria genial: modelo -> router -> app , elimina los globales!!!

function route({path, module, props, childRoutes}) {
  let urlPath = ''
  let childs = {}

  for (let i = 0, childRoute, moduleTemp; childRoute = childRoutes[i]; i++) {
    childs[childRoute.path] = childRoute.module
  }

  let routerDef = F.def({
    init: ({key}) => ({
      childName: '/',
      childStates:  R.mapObjIndexed((child, name) => child.init({key: name}), childs),
      ...module.init({key}),
    }),
    inputs: {
      changeChild: (ctx, Action, name) => Action.ChangeChild(name),
      childAction: (ctx, Action, name, a) => Action.ChildAction(name, a),
      ...module.inputs,
    },
    load: (ctx, i, Action) => {
      return {
        childModules: R.mapObjIndexed((child, name) => F.createContext(child, {action$: i.childAction(name)}), childs),
        ...module.load(ctx, i, Action),
      }
    },
    actions: {
      ChangeChild: [[String], (name, m) => R.evolve({childName: R.always(name)}, m)],
      ChildAction: [[String, Array], (name, a, m) => R.evolve({childStates: R.evolve({[name]: childs[name].update(a)})}, m)],
      ...module.actions,
    },
    interfaces: {
      view: (ctx, i, m) => module.interfaces.view(ctx, i, m),
      router: (ctx, i, m) => ({
        routeChange: function(path) {
          i.changeChild(path)
        }
      }),
    },
  })
  return routerDef
}

module.exports = route

    // let matchedRoute = urlMapper.map(path, {
    //   '/foo/:id': 1,
    //   '/test/:id': 2,
    //   '*': 3,
    // })
    // console.log(matchedRoute)
