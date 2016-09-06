# Architecture

## What is fractal?

## How many parts have?

## Fractal best practices

### Views

- Your init function should be pure
- Your inputs should be pure and may contain all tasks (side effects and ctx.action$ calls are in form of tasks - Task API is an incomming feature)
- Your actions should be pure
- Your view should be pure
- Separate styling logic in a separate object, use functions and 'this' (see `styles.messageItem.selectionLine.compute` in mailboxWithoutRouter example)
- Use the Router for binding your data with components, and Router should have all the navigation logic (Router is an incomming feature)

## Architectural patterns

Fractal offer a complete architecture with useful patterns and conventions that allows you center in usability, design and bussines logic instead of architecture.

(TODO: diagram of the architecture)

### Component

(TODO)

### Task

(TODO)

### Driver

(TODO)

### Service

A service is an entity that contains state that is transversal to modules(e.g. data service), the communication way is:

- service-driver attachs event listeners from inputs of modules to service
- service send data via event listeners
- modules send data via service-task

`// TODO: improve this explanation`
See an example of service pattern in the mailbox example

### The router pattern

(TODO)

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

