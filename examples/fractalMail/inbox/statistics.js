const R = require('ramda')
const flyd = require('flyd')
const h = require('snabbdom/h')
const F = require('../../../lib/')

// TODO: change the Fractal.js icon, now have the Fractal platform icon

module.exports = F.def({
  init: ({key}) => ({
    key,
    info: {
      read: 0,
      unread: 0,
    },
  }),
  inputs: {
    dataChanged: (ctx, Action, dataName, data) => Action.DataChanged(dataName, data),
  },
  actions: {
    DataChanged: [[String, R.T], (dataName, data, m) => R.evolve({[dataName]: R.always(data)}, m)],
  },
  interfaces: {
    data: (ctx, i, m) => ({
      info: i.dataChanged('info'),
    }),
    view: (ctx, i, m) => h('div', {style: styles.base, key: m.key}, [
      h('div', {style: styles.title}, 'Statistics'),
      h('div', {style: styles.content}, [
        h('div', {style: styles.statistic}, 'You have ' + m.info.unread + ' unread emails'),
        h('div', {style: styles.statistic}, 'You have ' + m.info.read + ' read emails'),
      ]),
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
  content: {
     fontSize: '16px',
     margin: '10px 10px 10px 40px',
  },
  statistic: {
    margin: '0px 10px 10px 0px',
  }
}
