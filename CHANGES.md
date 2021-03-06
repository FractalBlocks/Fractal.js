## Soon ...

- A way for connecting and compose modules declaratively (Work in progress) (DRAFTED)
- logVal with F.logVal (BREAKING)
- Change queue option of service by isQueued
- Document how to use dyamic modules. Is not for dynamic lists, for that use one module with list-items logic. Use dynamic modules only when have a tree like list-items-submodules (TODO)
- Update examples and implement one showing use cases of dynamic modules
- Update examples (replace `m` with `s`) (TODO)

## v0.4.8

- Fix callbacks in Data Task and routine recompile

## v0.4.7

- Routine recompile (workflow error with version, ups ... :D )

## v0.4.6

- Routine recompile - fail

## v0.4.5

- Bugfix changeState driver doesn't diff properly (Refactor)

## v0.4.4

- Bugfix changeState driver doesn't diff properly

## v0.4.3

- Bugfix changeState driver

## v0.4.2

- Bugfix HMR in view driver

## v0.4.1

- Add stateChange driver

## v0.4.0

- Upgraded snabbdom dependency to version 0.5.4

## v0.3.11

- Improve example/simplest
- Fix bug in style injection

## v0.3.10

- Upgraded dependency free-style to version 2.2.0
- Refactor style injection according new free-style API
- Upgraded example/simplest to last fractal-js version

## v0.3.9

- Improved error message when f.data.fetch internal promise handler fails

## v0.3.8

- Allow emit and event from another in services
- Dispatch an error when f.data.fetch internal promise fails

## v0.3.8

- Fix service bug

## v0.3.7

- Remove Proxy from service, and notify is fixed

## v0.3.6

- Add notify to events

## v0.3.5

- Fix merging bug

## v0.3.4

- Fix bug with module merging
- Remove deprecation notice while new version is done

## v0.3.3

- Proxy polyfill is added in lib/polyfills.js

## v0.3.1-beta.1

- Model is renamed in favor of state, Model is only the initial state
- Update core (replace `model` with `state`)
- Add test file in utils
- Add `logVal` function to test helpers
- Fix connectInterface bug

## v0.3.1-beta.0

- Implement async ctx.dispatch$ method for the same functionality as syncronous dispatch
- Add addWindowListener and removeWindowListener method to view task
- Add WindowListener task example with a drag and drop interface
- Fix `merge` bug related to detection of an mixed array of tasks and actions

## v0.3.0-beta.3

- Add file task
- Add file task example
- Change '-' with '_' in namespaces for class hashes

## v0.3.0-beta.1

- Add view task to core
- Fix styleName for classes (don't shows last key in prior version)
- Fix bug related to lists returned by inputs

## v0.3.0-beta.0

- Rename helpers.js by composition.js
- Rename `createContext` for `merge` (BREAKING)
- Add `mergeAll` function to composition helpers: (childs, (name, mDef) -> connections) -> contextualizedChilds
- Add `modules` and `scopedModules` options for module definitions via `merge`, `mergeAll` and `mergeModels`
- Fix timetravel core module
- Add _childAction
- Add _childActionScoped
- Add _dynamicChildAction
- Add dynamic module handling
- Update errorHandling module

## v0.2.4

- Fix bug with actions and addModuleInfo helper

## v0.2.3

- Fix bug with styles when passing an object
- Fix broken data-task
- Add namespace to style hashes

## v0.2.2

- Module definition can use animations
- Implement example of css animations
- Update mailboxNoRouter example

## v0.2.1

- Style helpers exposed in F.style and removed side effects from some functions

## v0.2.0

- Styles are disposed when hot-swap modules
- Styles are part of the module definition object (BREAKING)
- Update examples

## v0.1.1

- Fix broken build v0.1.0

## v0.1.0

- Implement granular log option for modules
- Deleted DEPRECATED methods
- Fix broken v0.0.18, and add es6 modules to Fractal (no more module.exports, require used for dynamic loading and use with .default), refactoring the whole library
- Update examples and DEPRECATE REMOVED log

## v0.0.18

- Module definitions should have a name in upper camelcase
- Implement _action input for easy subscription to an event that don't require processing or multiple dispatching
- Notify when a service receive an event with no handler
- Implement _modulePath string for tasks
- Notify when receive a task with no handler
- Clean and update deps
- Support async/await
- Deleted DEPRECATED fetch driver
- Improve docs and readme

## v0.0.17

- Fix bug with services that not exposes tasks or drivers
- Added starter tutorial (TODO)

## v0.0.16

- Add emitter task handler
- Add listenable driver
- Deprecated socketio task handler
- Deprecated socketio driver

## v0.0.15

- Error exceptions DEPRECATED in favor of future error$ stream implementation
- Services are automerged in engine definition (F.run)
- Added chatWithService example of using automerged services

## v0.0.14

- Css utils has a absoluteCenter props with flexbox
- DEPRECATED use of F.css, use F.style instead
- flyd is usable as F.flyd dependency

## v0.0.13

- Queue optional for services

## v0.0.12

- Specific tasks and optimizations

## v0.0.11

- Bug fixes and optimizations

## v0.0.10

- Add Router module
- Add free-style to core and some utilities
- Fixed playground errors

## v0.0.9-8

- Working in new examples and documentation
- Improved services

## v0.0.7

- Add chat example
- Add service to core
- Minor bug fixes
- Add Value Task
- Add a way to change socket in socketioTask and socketioDriver
- Engine exposes drivers and tasks
- Improved chat example
