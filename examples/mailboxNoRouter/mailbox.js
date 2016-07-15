const R = require('ramda')
const h = require('snabbdom/h')
const F = require('../../lib/')

const childs = {
  about: require('./about'),
  inbox: require('./inbox'),
}

// mailbox taht shows the complexity of constructing a mailbox, compare with the standard mailbox example that uses the router


module.exports =  F.def({
  init: () => ({
    tabName: 'inbox',
    connected: false,
    about: childs.about.init({key: 'about'}),
    inbox: childs.inbox.init({key: 'inbox'}),
  }),
  inputs: {
    dataChanged: (ctx, Action, dataName, data) => Action.DataChanged(dataName, data),
    changeTab: (ctx, Action, tabName) => Action.ChangeTab(tabName),
    childAction: (ctx, Action, tabName, action) => Action.ChildAction(tabName, action),
  },
  load: (ctx, i, Action) => {
    return {
      about: F.createContext(childs.about, {action$: i.childAction('about')}),
      inbox: F.createContext(childs.inbox, {action$: i.childAction('inbox')}),
    }
  },
  actions: {
    DataChanged: [[String, R.T], (dataName, data, m) => R.evolve({[dataName]: R.always(data)}, m)],
    ChangeTab: [[String], (tabName, m) => R.evolve({tabName: R.always(tabName)}, m)],
    ChildAction: [[String, Array], (tabName, action, m) => R.evolve({[tabName]: childs[tabName].update(action)}, m)],
  },
  // side connections
  interfaces: {
    view: (ctx, i, m) => h('div', {style: styles.base}, [
      h('div', {style: styles.header}, [
        h('div', {style: styles.headerRight}, [
          h('div', {style: styles.title}, 'MailboxNoRouter'),
          h('div', {style: styles.tabContainer}, [
            h('div', {style: styles.tab.c(m.tabName == 'inbox'), on: {click: () => i.changeTab('inbox')}}, 'Inbox'),
            h('div', {style: styles.tab.c(m.tabName == 'about'), on: {click: () => i.changeTab('about')}}, 'About'),
          ]),
        ]),
         // status
        h('div', {style: styles.statusContainer}, [
          h('svg', {style: {
            width: '35px',
            height: '35px',
          }}, [
            h('g', {attrs: {
              transform: 'scale(0.18)',
            }}, [
              h('circle', {attrs: {
                cx: '80',
                cy: '80',
                r: '75',
                fill: (m.connected) ? 'green' : 'red',
                'stroke-width': '0',
                stroke: 'black',
              }}),
              (m.connected) ? h('path', {attrs: {
                transform: 'translate(27, 27) scale(2.4)',
                d: 'M20.687,38.332c-2.072,2.072-5.434,2.072-7.505,0L1.554,26.704c-2.072-2.071-2.072-5.433,0-7.504    c2.071-2.072,5.433-2.072,7.505,0l6.928,6.927c0.523,0.522,1.372,0.522,1.896,0L36.642,7.368c2.071-2.072,5.433-2.072,7.505,0    c0.995,0.995,1.554,2.345,1.554,3.752c0,1.407-0.559,2.757-1.554,3.752L20.687,38.332z',
                fill: 'white',
              }}) : h('path', {attrs: {
                transform: 'translate(38, 38) scale(3.7)',
                d: 'M14.1,11.3c-0.2-0.2-0.2-0.5,0-0.7l7.5-7.5c0.2-0.2,0.3-0.5,0.3-0.7s-0.1-0.5-0.3-0.7l-1.4-1.4C20,0.1,19.7,0,19.5,0  c-0.3,0-0.5,0.1-0.7,0.3l-7.5,7.5c-0.2,0.2-0.5,0.2-0.7,0L3.1,0.3C2.9,0.1,2.6,0,2.4,0S1.9,0.1,1.7,0.3L0.3,1.7C0.1,1.9,0,2.2,0,2.4  s0.1,0.5,0.3,0.7l7.5,7.5c0.2,0.2,0.2,0.5,0,0.7l-7.5,7.5C0.1,19,0,19.3,0,19.5s0.1,0.5,0.3,0.7l1.4,1.4c0.2,0.2,0.5,0.3,0.7,0.3  s0.5-0.1,0.7-0.3l7.5-7.5c0.2-0.2,0.5-0.2,0.7,0l7.5,7.5c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3l1.4-1.4c0.2-0.2,0.3-0.5,0.3-0.7  s-0.1-0.5-0.3-0.7L14.1,11.3z',
                fill: 'white',
              }}),
            ])
          ]),
          h('span', {style: styles.statusText}, ((m.connected) ? 'Online' : 'Offline')),
        ]),
      ]),
      h('div', {style: styles.tab.content}, [ctx._md[m.tabName].interfaces.view(m[m.tabName])]),
    ]),
    data: (ctx, i, m) => {
      return {
        connected: i.dataChanged('connected'),
        ...F.mergeChild(m.inbox, childs.inbox, 'inbox', 'data', {action$: i.childAction('inbox')}),
      }
    },
  }
})


let styles = {
  base: {
    width: '100%',
    height: '100%',
    padding: '10px',
    fontFamily: 'Sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    height: '40px',
    marginBottom: '10px',
  },
  headerRight: {
    display: 'flex',
  },
  title: {
    ...F.css.noSelectable,
    cursor: 'pointer',
    fontFamily: 'cursive',
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'purple',
    marginRight: '50px',
  },
  statusContainer: {
    cursor: 'arrow',
    display: 'flex',
    alignItems: 'center',
    width: '100px',
  },
  statusText: {
    fontSize: '20px',
    marginLeft: '5px',
  },
  tabContainer: {
    display: 'flex',
    height: '40px',
  },
  tab: {
    base: {
      ...F.css.noSelectable,
      cursor: 'pointer',
      padding: '8px',
      fontSize: '20px',
      borderRadius: '3px',
      width: '70px',
      color: 'black',
    },
    c: function(selected) {
      return R.merge(this.base, selected ? this.selected : {})
    },
    selected: {
      color: '#4452a0',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 50px)',
    },
  },
}
