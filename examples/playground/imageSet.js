const R = require('ramda')
const flyd = require('flyd')
const h = require('snabbdom/h')
const F = require('../../lib/')

const fetchTask = F.tasks.fetch.types.fetch

// TODO: hacer que este modulo sea una matriz de 4x4 imagenes, evaluar si agregar un metodo de ayuda para esta tarea al core

let imageSet = F.def({
  // state stuff
  init: ({key}) => ({
    key,
    lorempixel: 'fetching',
    loremsrc: {},
  }),
  inputs: {
    fetchImage: (ctx, Action, _) => [
      Action.Reload(),
      [
        'fetch',
        fetchTask({
          url: 'https://unsplash.it/40/40?random',
          options: {
            method: 'get',
          },
          response: res => res.blob(),
          success: blob => ctx.action$(Action.Lorempixel(URL.createObjectURL(blob))),
          denied: () => ctx.action$(Action.LorempixelFail()),
          error: () => ctx.action$(Action.LorempixelFail()),
          netError: () => ctx.action$(Action.LorempixelFail()),
        })
      ]
    ],
  },
  actions: {
    Reload: [[], R.evolve({lorempixel: R.always('fetching')})],
    Lorempixel: [[String], (objURL, model) => R.evolve({
      lorempixel: R.always('success'),
      loremsrc: R.always(objURL)
    }, model)],
    LorempixelFail: [[], R.evolve({lorempixel: R.always('error')})],
  },
  // side connections
  interfaces: {
    view: (ctx, i, m) => h('div', {key: m.key, style: styles.base, hook: {insert: i.fetchImage }}, [
      (() => {
        if (m.lorempixel == 'fetching')
          return  h('span', {style: styles.image}, 'fetching...')
        if (m.lorempixel == 'success')
          return  h('img', {style: styles.image, attrs: {src: m.loremsrc}})
        if (m.lorempixel == 'error')
          return  h('span', {style: styles.image}, 'error')
      })(),
      h('button', {style: styles.button, on: {click: i.fetchImage}}, 'Reload'),
    ]),
  }
})

module.exports = imageSet

let styles = {
  base: {
    margin: '5px',
    width: '70px',
    height: '70px',
    padding: '2px',
    color: 'white',
    backgroundColor: 'rgb(80, 150, 190)',
    border: '1px solid blue',
  },
  count: {
    fontSize: '16px',
    textAlign: 'center',
  },
  button: {},
  image: {},
}
