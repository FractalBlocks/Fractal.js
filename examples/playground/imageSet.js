const R = require('ramda')
const flyd = require('flyd')
const h = require('snabbdom/h')

const F = require('../../lib/')

// TODO: hacer que este modulo sea una matriz de 4x4 imagenes, evaluar si agregar un metodo de ayuda para esta tarea al core

let imageSet = F.def({
  // state stuff
  init: () => ({
    lorempixel: 'fetching',
    loremsrc: {},
  }),
  inputs: {
    lorempixel: (ctx, Action, blob) => Action.Lorempixel(URL.createObjectURL(blob)),
    lorempixelError: (ctx, Action, d) => Action.LorempixelFail(),
    reload: (ctx, Action, d) => Action.Reload(),
  },
  actions: {
    Reload: [[], R.evolve({lorempixel: R.always('fetching')})],
    Lorempixel: [[String], (objURL, m) => R.evolve({
      lorempixel: R.always('success'),
      loremsrc: R.always(objURL)
    }, m)],
    LorempixelFail: [[], R.evolve({lorempixel: R.always('error')})],
  },
  // side connections
  interfaces: {
    view: (ctx, i, m) => h('div', {style: styles.base}, [
      (() => {
        if (m.lorempixel == 'fetching')
          return  h('span', {style: styles.image}, 'fetching...')
        if (m.lorempixel == 'success')
          return  h('img', {style: styles.image, attrs: {src: m.loremsrc}})
        if (m.lorempixel == 'error')
          return  h('span', {style: styles.image}, 'error')
      })(),
      h('button', {style: styles.button, on: {click: i.reload}}, 'Reload'),
    ]),
    fetch: (ctx, i, m) => {
      return {
        lorempixel: {
          url: 'http://lorempixel.com/40/40/?' + (new Date()).getTime(), // avoid caching
          options: {
            method: 'get',
          },
          active: m.lorempixel == 'fetching',
          response: res => res.blob(),
          success: i.lorempixel,
          denied: i.lorempixelError,
          error: i.lorempixelError,
          netError: i.lorempixelError,
        },
      }
    },
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
