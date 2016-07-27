const R = require('ramda')
const flyd = require('flyd')
const h = require('snabbdom/h')
const F = require('../../../lib/')


module.exports = F.def({
  init: ({key}) => ({
    key,
    message: {
      title: '',
      content: '',
    },
  }),
  inputs: {},
  actions: {},
  interfaces: {
    view: (ctx, i, m) => h('div', {style: styles.base, key: m.key}, [
      h('div', {style: styles.title}, m.message.title),
      h('div', {style: styles.senderContainer}, [
        'from: ',
        h('span', {style: styles.senderName}, m.message.sender),
      ]),
      h('div', {style: styles.content}, m.message.content),
    ]),
  }
})

let styles = {
  base: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: '24px',
    margin: '10px 10px 5px 30px',
  },
  senderContainer: {
     fontSize: '18px',
     margin: '0px 10px 10px 40px',
  },
  senderName: {
     fontSize: '16px',
  },
  content: {
     fontSize: '16px',
     margin: '10px 10px 10px 40px',
  },
}
