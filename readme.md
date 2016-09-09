# Fractal.js

Build your ideas as simple as possible. Fractal.js is an intuitive framework for building applications and interactive content.

## Why?

- A clear and flexible architecture that scales
- Its clear and concise, all you application code are [pure functions](https://en.wikipedia.org/wiki/Pure_function). Your app code has NO side effects
- Gives you powerful patterns and composing tools that helps to build small and large apps
- Your code are flexible, composable and reausable. Modularization as a foundation
- The state is isolated, this mean is serializable and you can hot-swap code updating the UI without reload the navigator
- You can lazy loading modules
- Router module for easely URL integration and server side rendering (Work in progress)
- Tools for socket.io integration

## Make your own fractal based app

The recomended way is using webpack, please download the [fractal-quickstart](https://github.com/fractalPlatform/Fractal.js-quickstart) repo.

Or install it in your browser with:

```html
<script src="dist/fractal.min.js"></script>
```

Or in nodejs, browserify, webpack like enviroments:

```
npm i --save fractal-js
```

See [Tutorial](https://github.com/fractalPlatform/Fractal.js/blob/master/TUTORIAL.md) for getting started with fractal.

### Run the examples

There are many useful examples at examples folder run it with:

```
git clone https://github.com/fractalPlatform/Fractal.js.git
cd Fractal.js
```

Be sure that you have installed [Node.js.](https://nodejs.org/en/). The examples you can run are:

- playground
- counterAndList
- chat
- mailboxNoRouter

```
npm run general NAME_EXAMPLE
```

Some examples needs a backend (e.g. Chat or mailboxNoRouter), run it with: `node server`, see the README of the example you want to run for a detailed description.


(TODO: More)

## TODOs and roadmap

- Put a rank function to data utils

## Building

For a production version run: `npm run compile`, and see the result in the `dist/` folder.

## Tips

- Assets are static, these are copied to the dist folder.
- Resources are dynamic these are inserted when your require (e.g. require('../resources/myresource.png') ) them.

## TODOs

What are missing for this repo:

- Expose snabbdom
- Notify when a service receive an event with no handler
- Notify when receive a task with no handler
- Add async/await transform to babel plugins in quickstart, examples and fractal-core
- Implement and document serviceTest
- Implement an example of whole service pattern, serviceTest module and API definitions
- Implement _error task and attach it by default, this can be done all error handling
- Implement module validation and dispatch a semantic error
- Implement semantic errors via _error task
- Improve the quickstart.
- Reference tutorials whe done.

## Ideas

What maybe great for this repo:

- Document integration of manifest.json
- Implement a way to load workers
- Implement a way to load service workers
- Make a dynamicMds function for dynamic input handling FEATURE (Document!!!)
- Make a driver for listenable things, abstract the socket driver FEATURE
- Document of CSS tools for js and implement examples (PARTIAL)
- Implement live examples
- Implement online editor that allows live preview and hot-swaping, using: Monaco and Fractal.js
- Implement the forms example and document the composing tools
- Implement an i18n middleware example
- Implement examples and document the service pattern
- Implement fractalMail example using an IMAP and XMPP client, with OAuth 2.0
- Implement the Router inspired on react-router
- Implement debugging tools for service (log...) FEATURE
- Implement a test suite
- Implement examples of test suite
- Improve and update examples, are very outdated (PARTIAL IMPLEMENTED)
- Implement and document server side routing example
- screenInfo as a Global listener(middleware) // maybe deprecated?
- Separate fractal examples into other git repo, with fractalEngine as module
- Improve documentation of fractal
- Fix dependencies and verify that examples works
- Improve documentation of fractal-examples
- Publish fractal-examples to github
- Implement fractal-tutorial and publish to github
- Implement the whole library in Typescript
- Implement ramda-mori helpers for Persistent Data Structures
- Implement an app that uses PouchDB
- Implement more examples and tutorials
- Make videotutorials and start a difusion campaign

## Roadmap

There are TODOs for short term:

- Start implementation of fractal-ui

There are TODOs for medium term:

- Research(experiment, observe and write) about multi-engine apps
- Implement fractal-native using anvil
  - Implement flyd-java
  - Implement union-type-java
- Implement fratal-native iOS
  - Implement flyd-swift
  - Implement union-type-swift
  - Implement anvil-ios
