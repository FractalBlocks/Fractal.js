# Fractal.js

Build your ideas as simple as possible. Fractal.js is an intuitive framework for building applications and interactive content.

## Why?

- Its clear and concise
- Shows powerful patterns that helps you to build small and large apps
- Your code are flexible, composable and reausable

## Features

- Predefined patterns with all you need for building amazing apps
- Powerful composing tools
- Your app code has no side effects
- A clear and flexible architecture that scales
- Router module for easely URL integration and server side rendering (Work in progress)
- Tools for socket.io integration

## Make your own fractal based app

Install it in your browser for:

```
<script src="dist/fractal.min.js"></script>
```

Or in nodejs, browserify, webpack like enviroments:

```
npm i --save fractal-js
```

The recomended way is using webpack, please download the [fractal-quickstart](https://github.com/fractalPlatform/Fractal.js-quickstart) repo.

### Run the examples

There are many useful examples at examples folder run it with:

```
cd fractal-js
```

```
npm run general NAME_EXAMPLE
```

Some examples needs a backend (e.g. Chat), run it with: `node server`, see the README of the example you want to run.


(TODO: More)

## TODOs and roadmap

- Implement live examples
- Implement online editor that allows live preview and hot-swaping, using: Monaco and Fractal.js
- Implement the forms example and document the composing tools
- Implement an i18n middleware example
- Implement and document CSS tools for js (PARTIAL)
- Implement examples and document the service pattern
- Implement fractalMail example using an IMAP and XMPP client, with OAuth 2.0
- Implement the Router inspired on react-router
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
