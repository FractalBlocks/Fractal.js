<img src="https://github.com/fractalPlatform/Fractal.js/blob/master/assets/textlogo.png" width="520px">

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

See the detailed [architecture here](https://github.com/fractalPlatform/Fractal.js/blob/master/docs/ARCHITECTURE.md).

## Make your own Fractal based app

The recomended way is using webpack, please download the [fractal-quickstart](https://github.com/fractalPlatform/Fractal.js-quickstart) repo.

Or install it in your browser with:

```html
<script src="dist/fractal.min.js"></script>
```

Or in nodejs, browserify, webpack like environments:

```bash
npm i --save fractal-js
```

See [Tutorial](https://github.com/fractalPlatform/Fractal.js/blob/master/docs/tutorials/tutorial.md) for getting started with Fractal.

### Run the examples

There are many useful examples at examples folder. Be sure that you have installed [Node.js](https://nodejs.org/en/), please [download Fractal source](https://github.com/fractalPlatform/Fractal.js/archive/master.zip) and extract them.

The examples you can run are:

- playground
- counterAndList
- chat
- mailboxNoRouter
- tasks

Open a command window into `Fractal.js` folder and run:

```bash
npm i
npm run general NAME_OF_EXAMPLE
```

Some examples needs a backend (e.g. Chat or mailboxNoRouter), run it with:

```bash
cd examples/NAME_OF_EXAMPLE
npm i
node server
```

See the [README of the example](https://github.com/fractalPlatform/Fractal.js/tree/master/examples) you want to run for a detailed description.

## Building

For a production version run: `npm run compile`, and see the result in the `dist/` folder.

## Tips

- Assets are static, these are copied to the dist folder when you compile the app.
- Resources are dynamic these are inserted when your require (e.g. require('../resources/myresource.png') ) them, this are serialized and inserted into code.

## TODOs

What are missing for this repo:

- Implement a way to compose modules in one place (@carloslfu)
- Implement a way to reattach tasks, drivers and services (@carloslfu)
- Implement CSS helpers for code reuse across objects (deep merge)
- Document granular log option for modules (@MissyM)
- Implement _error task and attach it by default, this can be done all app error handling (@carloslfu)
- Implement and document serviceTest (FEATURE)
- Implement on demand large app loading example (@carloslfu)
- Implement pouchdb integration example (@carloslfu)
- Implement the Router inspired on [react-router](https://github.com/ReactTraining/react-router) (STARTED - @carloslfu)
- Implement register of modules definitions and dispose them when dispose engine (MEMORY)
- Implement a way to attach disposables to module definitions
- Implement names for all the modules and examples
- Implement tests in TESTS.md and document all TODOs
- Implement an example of whole service pattern, serviceTest module and API definitions
- Implement task middleware, this allows modules to take control on module tasks (FEATURE)
- Implement ui-modules, take the button from quickstart repo
- Implement module validation and dispatch a semantic error
- Implement semantic errors via _error task
- Improve the quickstart.
- Reference tutorials whe done.
- Implement the whole library in Typescript (EVALUATE INCREMENTAL)
- Build Fractal logo in Haskell Diagrams and include source code (ELEGANT + FANCY)

## Ideas

What maybe great for this repo:

- Evaluate converting project into a monorepo using Lernajs
- Implement a way to load workers
- Implement a way to load service workers
- Implement a test suite
- Implement examples of test suite
- Evaluate usage of Fractal for backend and nano-micro services approach
- Explore porting Fractal to Haskell, makes sense build a DSL. A good starting point [Threepenny-gui] (https://wiki.haskell.org/Threepenny-gui) and [Haste Language](http://haste-lang.org/)
- Document integration of manifest.json for webapps
- Document of CSS tools for js and implement examples (PARTIAL)
- Implement live examples
- Implement online editor that allows live preview and hot-swaping, using: Monaco and Fractal.js
- Implement the forms example and document the composing tools
- Implement an i18n middleware example
- Implement examples and document the service pattern
- Implement fractalMail example using an IMAP and XMPP client, with OAuth 2.0
- Improve and update examples, are very outdated (PARTIAL IMPLEMENTED)
- Implement and document server side routing example
- screenInfo as a Global listener(middleware) // maybe deprecated?
- Separate fractal examples into other git repo, with fractalEngine as module // (EVALUATE)
- Improve documentation of fractal
- Fix dependencies and verify that examples works
- Improve documentation of fractal-examples
- Publish fractal-examples to github
- Implement fractal-tutorial and publish to github
- Implement ramda-mori helpers for Persistent Data Structures
- Implement an app that uses PouchDB
- Implement more examples and tutorials
- Make videotutorials and start a difusion campaign
- Put a rank function to data utils

## Roadmap

There are TODOs for short term:

- Start implementation of fractal-ui (work in progess...)

There are TODOs for medium term:

- Research(experiment, observe and write) about multi-engine apps
- Implement fractal-native using anvil
  - Implement flyd-java
  - Implement union-type-java
- Implement fratal-native iOS
  - Implement flyd-swift
  - Implement union-type-swift
  - Implement anvil-ios
