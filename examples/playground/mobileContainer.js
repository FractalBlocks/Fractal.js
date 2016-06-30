const R = require('ramda')
const h = require('snabbdom/h')


let container = function (attrs, childs) {
  return h('div', {style: styles.base}, [
      h('div', {style: styles.container}, childs),
    ])
}

let styles = {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#aaaaaa',
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  container: {
    width: '400px',
    height: '600px',
  }
}

module.exports = container
