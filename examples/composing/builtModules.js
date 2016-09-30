// example of a collection of modules using a module builder

import moduleBuilder from './moduleBuilder'


let modules = {
  submodule0: moduleBuilder({color: 'purple'}),
  submodule1: moduleBuilder({color: 'grey'}),
  submodule2: moduleBuilder({color: 'blue'}),
}

export default modules


if (module.hot) {
  module.hot.dispose(function() {
    for (let name in modules) {
      modules[name].dispose()
    }
  })
}

