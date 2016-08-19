const R = require('ramda')
const h = require('snabbdom/h')
const F = require('../../lib/')

const children = {
  about: require('./about'),
  inbox: require('./inbox'),
  chat: require('./chat'),
}

// mailbox taht shows the complexity of constructing a mailbox, compare with the standard mailbox example that uses the router


module.exports =  F.def({
  init: () => ({
    tabName: 'inbox',
    connected: false,
    children: children.init(),
  }),
  inputs: {
    dataChanged: (ctx, Action, dataName, data) => Action.DataChanged(dataName, data),
    changeTab: (ctx, Action, tabName) => Action.ChangeTab(tabName),
    childAction: children.input(),
  },
  load: (ctx, i, Action) => {
    return {
      about: F.createContext(childs.about, {action$: i.childAction('about')}),
      inbox: F.createContext(childs.inbox, {action$: i.childAction('inbox')}),
      chat: F.createContext(childs.chat, {action$: i.childAction('chat')}),
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
          h('div', {style: styles.title}, 'Forms'),
          h('div', {style: styles.tabContainer}, [
            h('div', {style: R.merge(styles.tab, (m.tabName == 'common') ? styles.tabSelected : styles.tabNormal), on: {click: () => i.changeTab('about')}}, 'About'),
            h('div', {style: R.merge(styles.tab, (m.tabName == 'special') ? styles.tabSelected : styles.tabNormal), on: {click: () => i.changeTab('inbox')}}, 'Inbox'),
            h('div', {style: R.merge(styles.tab, (m.tabName == 'wow') ? styles.tabSelected : styles.tabNormal), on: {click: () => i.changeTab('chat')}}, 'Chat'),
          ]),
        ]),
      ]),
      h('div', {style: styles.tabContent}, [ctx._md[m.tabName].interfaces.view(m[m.tabName])]),
    ]),
    data: (ctx, i, m) => {
      return {
        connected: i.dataChanged('connected'),
        ...F.mergeChild(m.inbox, childs.inbox, 'inbox', 'data', {action$: i.childAction('inbox')}),
        ...F.mergeChild(m.chat, childs.chat, 'chat', 'data', {action$: i.childAction('chat')}),
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
    ...F.style.noSelectable,
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
    ...F.style.noSelectable,
    cursor: 'pointer',
    padding: '8px',
    fontSize: '20px',
    borderRadius: '3px',
    width: '70px',
  },
  tabNormal: {
    color: 'black',
  },
  tabSelected: {
    color: '#4452a0',
  },
  tabContent: {
    width: '100%',
    height: 'calc(100% - 50px)',
  },
}
