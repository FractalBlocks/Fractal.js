# Architecture

Fractal is a fully featured framework to make frontend apps using a simple and powerfull architecture. Fractal is based on functional programming and other aproaches that simplifies UI development.

Fractal is an unidirectional user interface architeture that is fractal:

> A unidirectional architecture is said to be fractal if subcomponents are structured in the same way as the whole is.
> - [Andre Staltz](http://staltz.com/unidirectional-user-interface-architectures.html)


If you can learn more about foundations see:

- An awesome article called [Unidirectional user interface architectures](http://staltz.com/unidirectional-user-interface-architectures.html) by [Andre Staltz](http://staltz.com/)
- A nice repo and discuss in [functional-frontend-architecture](https://github.com/paldepind/functional-frontend-architecture) by [Simon Friss Vindum](https://github.com/paldepind)
- [Controlling Time and Space: understanding the many formulations of FRP](https://www.youtube.com/watch?v=Agu6jipKfYw) talk by Evan Czaplicki

## Concepts

Fractal offer a complete architecture with useful patterns and conventions that allows you center in usability, design and bussines logic instead of architecture.

(TODO: diagram of the architecture)

## Modules

A module is a set of your app functionality that is related to a topic. Modules are computing units and have 3 things:

- Model -> All the module state are in one data structure called model. This are defined by the `init` function
- Processing -> Is the way in that application transform data and react to it. Here live two types of functions:
  - Inputs -> Are used to react to events. This functions transform data and return a list (or one) of Action and/or Tasks structures with that transformed data, this list is dispatched to the corresponding Action Updates and Task Handlers by Fractal.
  - Actions -> Are functions that transform or modifies specific parts of the model. An Action has three parts: a name, data related to it and a tranform function (also called update in Model View Update pattern). Think in Actions like things triggered for doing certain modifications to the model and therefore all the interfaces (also functions) are recomputed including the view.
- Comunications -> Interaction with external world, here live two type of functions:
  - Interfaces -> Are functions that depends on the model and there are many types of interfaces, eg view. Each change on the model causes a recompute of all interfaces, the result of an interface of a module is passed to the parent module and are propagated to the main module which pass them to a Driver related to this specific type of interface (eg View Driver). Drivers interact with external world and perform side effects, also can subscribe Inputs to events that occurs in the interface context, eg a View interface can subscribe an Input to the click event over a button. Interfaces are designed for continuous communication with external world, via model updates or event subscriptions.
  - Tasks -> Are data structures that have attached a name and some data, when dispatched, Task Handlers runs an especific task an perform a side effect using this data. Tasks are designed for discrete communication with external world.

For each module should be a module definition. Implementation is described in the following lines.

The `def` function is responsible to convert definition objects into module objects.

```javascript
definitionObj = {
  init, inputs, outputNames,
}
def : definitionObj -> moduleObj
```

Module objects are similar to definition objects. `def` function makes some validations and prepare the definition object to be executed by Fractal core.

### Model

The model contains all the module state and only can be changed by an Action update. The `init` function is responsible to return the initial model, there are part of the model called `key`, this one identifies the module and should be unique for the same level (modules that are childs of the same parent).

```javascript
init : ({key}) -> ({key, ...initialModel})
```

### Inputs

(TODO)

### Actions

(TODO)

## Tasks

(TODO)

## Interfaces

### View

This is the most common interface.

(TODO)

## Services

A service is an entity that contains state that is transversal to modules(e.g. data service), the communication way is:

- service-driver attachs event listeners from inputs of modules to service
- service send data via event listeners
- modules send data via service-task

`// TODO: improve this explanation`
See an example of service pattern in the mailbox example

### The router pattern

(TODO)

## Tips

(TODO: put tips in each topic)

- Your init function should be pure
- Your view should be pure
- Use styles with toggeable classes in your views
- Your inputs should be pure and may contain all tasks (side effects and ctx.action$ calls are in form of tasks - Task API is an incomming feature)
- Your actions should be pure
- Use the Router for binding your data with components, and Router should have all the navigation logic (Router is an incomming feature)

## Interaction Patterns

- feature adding: model(data + state) -> logic -> interface
- debugging code
- code navigation
- composing
- UI interaction

## Module Patterns model - logic - interface

- sequential
- router
- string handling (i18n)
- animations

## Composition Patterns for: modules and model

- simple: a -> a
- router: (arr:[a, b, c], num) -> arr[num]
- lazy router: (arr:[a, b, c], num) -> arr[num], and only evualuates arr[num]; AKA async composing
- dinamic list
- lazy rendered dinamic list (Comming soon ...), AKA infinite list

Modules that use load or loadAfter to dispatch actions shouldn't to be composed dinamically, this causes infinite loops. Note that lazy loaded modules can't be composed dinamically for this reason but not make sense to do that!.
