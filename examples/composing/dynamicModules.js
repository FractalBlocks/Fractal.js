// example of a collection of modules using a module builder

import moduleBuilder from './moduleBuilder'


let modules = {
  submodule0: moduleBuilder({color: 'purple', hasRemove: true}),
  submodule1: moduleBuilder({color: 'grey', hasRemove: true}),
  submodule2: moduleBuilder({color: 'blue', hasRemove: true}),
}

export default modules


if (module.hot) {
  module.hot.dispose(function() {
    for (let name in modules) {
      modules[name].dispose()
    }
  })
}
