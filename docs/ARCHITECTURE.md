# Architecture

Fractal is a fully featured framework to make frontend apps using a simple and powerfull architecture. Is based on functional programming and other aproaches that simplifies UI development.

Fractal is an unidirectional user interface architeture that is fractal:

> A unidirectional architecture is said to be fractal if subcomponents are structured in the same way as the whole is.
> - [Andre Staltz](http://staltz.com/unidirectional-user-interface-architectures.html)

Fractal modules are based on the [Model View Update architecture](http://staltz.com/unidirectional-user-interface-architectures.html#elm). This means that each module are mostly structured in this way.

If you can learn more about foundations see:

- An awesome article called [Unidirectional user interface architectures](http://staltz.com/unidirectional-user-interface-architectures.html) by [Andre Staltz](http://staltz.com/)
- A nice repo and discuss in [functional-frontend-architecture](https://github.com/paldepind/functional-frontend-architecture) by [Simon Friss Vindum](https://github.com/paldepind)
- [Controlling Time and Space: understanding the many formulations of FRP](https://www.youtube.com/watch?v=Agu6jipKfYw) talk by Evan Czaplicki

## Concepts

Fractal offer a complete architecture with useful patterns and conventions that allows you center in usability, design and bussines logic instead of architecture. In the next drawing you can see the whole overview.

(TODO: diagram of the architecture)

All the app logic are into main module and are hierachicaly structured and composed following the MVU pattern.

## Modules

A module is a set of your app functionality that is related to a topic. Modules are computing units and have 3 parts:

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

Module objects are similar to definition objects. `def` function makes some validations and prepare the definition object to be executed by Fractal core or merged in another module.

### Model

The model contains all the module state and only can be changed by an Action update. The `init` function is responsible to return the initial model. There are a part of the model called `key`, this one identifies the module and should be unique for the same level of hierarchy (modules that are childs of the same parent).

```javascript
init : ({key}) -> ({key, ...initialModel})
```

### Inputs

Inputs are the way interfaces dispatch actions or tasks. This means inputs are subscribed by interfaces to any external event, and in react to this event the input process the data and dispatch actions or tasks.

Inputs are described into an object, and have a function that behaves like expected.

```javascript
{
  // Inputs can return an Action
  input1: (ctx, Action, data1, data2 ...) => Action.SomeAction(data1, ...),
  // Inputs can return a Task
  input2: (ctx, Action, data1, data2 ...) => ['taskName', taskEmitter(data1, ...)],
  // Inputs can return a list of Actions
  input3: (ctx, Action, data1, data2 ...) => [
    Action.SomeAction1(data1, ...),
    Action.SomeAction2(data1, ...),
  ],
  // Inputs can return a list of Tasks
  input4: (ctx, Action, data1, data2 ...) => [
    ['taskName1', task1Emitter(data1, ...)],
    ['taskName2', task2Emitter(data1, ...)],
  ],
  // Inputs can return a list of Actions and Tasks
  input5: (ctx, Action, data1, data2 ...) => [
    ['taskName', task1Emitter(data1, ...)],
    Action.SomeAction(data1, ...),
  ],
}
```

There are two arguments passed by Fractal to each Input, the context (ctx) and the Actions (Action). Action are an object with the Action types. The context are composed by multiple parts but there are two that are very important to this topic, action$ and task$ streams.

The action$ stream is the spine of fractal, all Actions are dispatched by it. This is used in the case that an Input should dispatch an Action asyncronously, similarly task$ stream are used for dispatch Tasks asyncronously. Take a look of the next code:

```javascript
{
  // Inputs can dispatch Action and Tasks asyncronously
  input1: (ctx, Action, data1, data2 ...) => someAsyncStuff1.then(result => ctx.action$(Action.SomeAction(data1, ...))),
  input2: (ctx, Action, data1, data2 ...) => someAsyncStuff2.then(result => ctx.task$(Action.SomeAction(data1, ...))),
  input3: (ctx, Action, data1, data2 ...) => {
    // asyncronous dispatching
    someAsyncStuff2.then(result => {
      ctx.task$(['taskName1', task1Emitter(data1, ...)])
      ctx.action$(Action.SomeAction1(data1, ...))
    })
    // syncronous dispatching
    return [
      ['taskName2', task1Emitter(data1, ...)],
      Action.SomeAction2(data1, ...),
    ]
  },
}
```

### Actions

(TODO)

## Tasks

(TODO)

## Interfaces

### View

This is the most common interface.

(TODO)

## Composing

Composing is done by the MVU pattern. You can nest modules infinitely in theory, but its a very bad practice. Use composition for achive reutilization and modularity of your app functionality.

In a nutsell MVU composing means that each part of the child module is merged into their related parent part, the following ilustrates this point:

- Child **model** is merged into parent **model**
- Child **inputs** is merged into parent **inputs**
- Child **actions** is merged into parent **actions**
- Child **interfaces** is merged into parent **interfaces**

Each of that task is delegated to the parent module, this means have a grained control over childs. Note that Tasks are not composed by hand, Tasks are direct ways to the external world (or to a service). If you need to take control on tasks, you can use the Task Middleware (Work in progress ...) (TODO-DOCS).

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
