# Architecture

Fractal is a fully featured framework to make frontend apps using a simple and powerfull architecture. Fractal is based on functional programming and other aproaches that simplifies UI development.

Fractal is an unidirectional user interface architeture that is fractal:

> A unidirectional architecture is said to be fractal if subcomponents are structured in the same way as the whole is.
> - [Andre Staltz](http://staltz.com/unidirectional-user-interface-architectures.html)


If you can learn more about foundations see:

- An awesome article by [Andre Staltz](http://staltz.com/): [Unidirectional user interface architectures](http://staltz.com/unidirectional-user-interface-architectures.html)
- A nice repo and discuss by [Simon Friss Vindum](https://github.com/paldepind): [functional-frontend-architecture](https://github.com/paldepind/functional-frontend-architecture)
- A tak by Evan Czaplicki: [Controlling Time and Space: understanding the many formulations of FRP](https://www.youtube.com/watch?v=Agu6jipKfYw)

## How many parts have Fractal?

Fractal offer a complete architecture with useful patterns and conventions that allows you center in usability, design and bussines logic instead of architecture.

(TODO: diagram of the architecture)

## Modules

A module is a set of your app functionality that is related to a topic. Modules are computing units and have 3 things:

- Model: All the module state are in one data structure called model.
- Processing: Is the way in that application transform data and react to it. Here live two
  -
  - A set of [pure functions](https://en.wikipedia.org/wiki/Pure_function) that transform or modifies specific parts of the model, in Fractal are described with Actions. An action has three parts: a name, data related to and a tranform function. Think in Actions like things triggered for doing certain modifications to the model and therefore all the interfaces are recomputed including the view.
- Comunications: Interaction with external world, here live Tasks and Interfaces.


### Model
(TODO)

### Processing
(TODO)

### Model
(TODO)

## Tasks

(TODO)

## Drivers

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

