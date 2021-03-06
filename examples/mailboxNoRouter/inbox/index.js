const R = require('ramda')
const h = require('snabbdom/h')
const F = require('../../../lib/')

const dataEventTask = F.tasks.data.types.emit

const childs = {
  statistics: require('./statistics'),
  message: require('./message'),
}

let validPage = (page, numPage) => (page < 1) ? 1 : (page > numPage) ? numPage : page

// TODO: the state should be an svg animation with css

module.exports = F.def({
  init: ({key}) => ({
    key,
    state: 'outdated', // outdated | fetching | updated | error
    sendView: false,
    message: childs.message.init({key: 'message'}),
    statistics: childs.statistics.init({key: 'statistics'}),
    messageId: -1,
    messages: [],
    page: 1,
    info: {
      pages: 1,
    },
    senderText: {
      focused: false,
      value: '',
    },
    titleText: {
      focused: false,
      value: '',
    },
    contentText: {
      focused: false,
      value: '',
    },
    // dialogMsgSended: false, //  TODO: evaluate implementation
  }),
  load: (ctx, i, Action) => {
    return {
      message: F.createContext(childs.message, {action$: i.childAction('message')}),
      statistics: F.createContext(childs.statistics, {action$: i.childAction('statistics')}),
    }
  },
  inputs: {
    send: (ctx, Action, _) => Action.Send(),
    textinputChange: (ctx, Action, name, prop, value) => Action.TextinputChange(name, prop, value),
    setSendView: (ctx, Action, value) => Action.SetSendView(value),
    dataChanged: (ctx, Action, dataName, data) => Action.DataChanged(dataName, data),
    changeMessage: (ctx, Action, idx, msg) => [
      ...(idx != -1 && msg.state == 'unread') ? [['data', dataEventTask('messageRead', msg._id.split('/')[2], {})]] : [],
      Action.ChangeMessage(idx),
    ],
    setPage: (ctx, Action, page, lastPage) => (page != lastPage) ? [
      'data',
      dataEventTask('pageChanged', page, {
        success: () => {
          ctx.action$(Action.SetPage(page))
          ctx.action$(Action.ChangeMessage(-1))
        },
        error: () => {
          ctx.action$(Action.Identity()) // for set the value of select when error
        },
      })
    ] : [],
    childAction: (ctx, Action, idx, action) => Action.ChildAction(idx, action),
  },
  actions: {
    Identity: [[], R.identity],
    Send: [[], R.evolve({
      titleText: R.evolve({
        value: R.always(''),
      }),
      contentText: R.evolve({
        value: R.always(''),
      }),
    })],
    TextinputChange: [[], (name, prop, value, m) => R.evolve({[name]: R.evolve({[prop]: R.always(value)})}, m)],
    SetSendView: [[R.T], (value, m) => R.evolve({sendView: R.always(value)}, m)],
    DataChanged: [[String, R.T], (dataName, data, m) => R.evolve({[dataName]: R.always(data)}, m)],
    ChangeMessage: [[Number], (idx, m) => R.evolve({
      messageId: R.always(idx),
      message: R.evolve({message: (idx != -1) ? R.always(m.messages[idx]) : R.identity}), // props pattern!
      messages: R.adjust((idx != -1) ? R.evolve({state: R.always('read')}) : R.identity, idx),
    }, m)],
    SetPage: [[Number], (page, m) => R.evolve({page: R.always(page)}, m)],
    ChildAction: [[String, Array], (childName, action, m) => R.evolve({[childName]: childs[childName].update(action)}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', {style: styles.base, key: m.key}, [
      h('div', {style: styles.leftPanel}, [
        h('div', {style: styles.statistics, on: {click: () => i.changeMessage(-1, {})}}, 'Emails'),
        h('div', {style: styles.messageChooser}, [
          ...R.addIndex(R.map)((msg, idx) =>
            h('div', {style: styles.messageItem.base, on: {click: () => i.changeMessage(idx, msg)}}, [
              h('div', {style: styles.messageItem.title(msg.state == 'read')}, msg.title),
              h('div', {style: styles.messageItem.content}, msg.content.slice(0, 30) + ' ...'),
              h('div', {style: styles.messageItem.selectionLine.c(m.messageId == idx)}),
            ])
          , m.messages)
        ]),
        h('div', {style: styles.pagination.base}, [
          h('div', {style: {fontSize: '10px'}}, m.state),
          // TODO: buttons should have hover effect, related TODO: use free-style library for styles
          h('a', {style: styles.pagination.button, on: {click: () => i.setPage(validPage(m.page - 1, m.info.pages), m.page)}}, '\u25C0'),
          h('a', {style: styles.pagination.button, on: {click: () => i.setPage(validPage(m.page + 1, m.info.pages), m.page)}}, '\u25B6'),
          h('select', {
            style: styles.pagination.select,
            props: {value: m.page},
            on: {change: ev => {
              i.setPage(+ev.target.value, m.page)
              ev.target.value = m.page // fix error for UI state in select
            }},
          },
            R.map(page => h('option', {style: styles.pagination.option, attrs: {value: page}}, page), R.range(1, m.info.pages + 1))
          ),
          h('div', {style: styles.pagination.countTitle}, ' of ' + m.info.pages),
        ]),
      ]),
      h('div', {style: styles.messageContent}, [
        (m.messageId != -1) ? ctx._md.message.interfaces.view(m.message) : ctx._md.statistics.interfaces.view(m.statistics)
      ]),
      h('div', {key: '', style: styles.sendView.c(m.sendView)}, [
        h('div', {style: styles.sendView.container}, [
          h('div', {style: styles.sendView.controlGroup}, [
            h('label', {style: styles.sendView.label}, 'Para:'),
            h('input', {
              style: styles.sendView.textinput.c(m.senderText.focused),
              attrs: { disabled: 'disabled'},
              props: {value: 'fractalplatform@gmail.com'},
            }),
            h('span', {style: styles.sendView.sendButton, on: {click: i.send}}, 'Enviar'),
          ]),
          h('div', {style: styles.sendView.controlGroup}, [
            h('label', {style: styles.sendView.label}, 'Asunto:'),
            h('input', {
              style: styles.sendView.textinput.c(m.titleText.focused),
              props: {value: m.titleText.value},
              on: {
                change: ev => i.textinputChange('titleText', 'value', ev.target.value),
                focus: ev => i.textinputChange('titleText', 'focused', true),
                blur: ev => i.textinputChange('titleText', 'focused', false),
              },
            }),
          ]),
          h('textarea', {
            style: styles.sendView.textarea.c(m.contentText.focused),
            props: {value: m.contentText.value},
            on: {
              change: ev => i.textinputChange('contentText', 'value', ev.target.value),
              focus: ev => i.textinputChange('contentText', 'focused', true),
              blur: ev => i.textinputChange('contentText', 'focused', false),
            },
          }),
        ]),
      ]),
      h('div', {key: '', style: styles.showSendViewBtn.c(m.sendView), on: {click: () => i.setSendView(!m.sendView)}}, 'Redactar'),
      // h('div', {key: '', style: styles.dialogMsgSended.c(m.dialogMsgSended), on: {click: () => i.setSendView(!m.sendView)}}, 'Redactar'),
    ]),
    data: (ctx, i, m) => ({
      state: i.dataChanged('state'),
      info: i.dataChanged('info'),
      messages: i.dataChanged('messages'),
      ...F.mergeChild(m.statistics, childs.statistics, 'statistics', 'data', {action$: i.childAction('statistics')}),
    }),
  }
})

let styles = {
  base: {
    display: 'flex',
    width: '100%',
    height: '100%',
    padding: '10px',
  },
  leftPanel: {
    height: '100%',
  },
  statistics: {
    padding: '4px 4px 4px 5px',
    fontSize: '16px',
    backgroundColor: 'purple',
    color: 'white',
    height: '26px',
  },
  messageChooser: {
    display: 'flex',
    flexDirection: 'column',
    padding: '5px',
    minWidth: '275px',
    height: 'calc(100% - 62px)',
    overflowY: 'scroll',
  },
  pagination: {
    base: {
      height: '36px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      ...F.style.noSelectable,
      cursor: 'pointer',
      fontSize: '32px',
      padding: '0px 2px 0px 2px',
      margin: '0px 2px 0px 2px',
    },
    select: {
      height: '32px',
      fontSize: '20px',
      margin: '4px 5px 2px 15px',
    },
    option: {},
    countTitle: {
      padding: '10px 5px',
      fontSize: '20px',
    },
  },
  messageContent: {
    width: 'calc(100% - 275px)',
    padding: '8px',
  },
  messageItem: {
    base: {
      display: 'flex',
      flexDirection: 'column',
      padding: '5px',
      minHeight: '55px'
    },
    titleNormal: {
      fontSize: '20px',
      fontWeight: 'bold',
    },
    titleRead: {
      fontSize: '20px',
      fontWeight: 'normal',
    },
    title: function(cond) {
      return R.merge(
        this.titleNormal,
        cond ? this.titleRead : {}
      )
    },
    content: {
      fontSize: '14px',
      marginLeft: '4px',
    },
    selectionLine: {
      base: {
        width: '0%',
        height: '2px',
        margin: '2px',
        backgroundColor: 'green',
        transition: 'width 0.5s',
      },
      selected: {
        width: '100%',
      },
      c: function(cond) {
        return R.merge(
          this.base,
          cond ? this.selected : {}
        )
      },
    },
  },
  sendView: {
    base: {
      transition: 'width 0.5s, height 0.5s',
      position: 'fixed',
      bottom: '55px',
      right: '5px',
      overflow: 'hidden',
      '-webkit-box-shadow': '0px 0px 14px -4px rgba(0,0,0,0.75)',
      '-moz-box-shadow': '0px 0px 14px -4px rgba(0,0,0,0.75)',
      'box-shadow': '0px 0px 14px -4px rgba(0,0,0,0.75)',
      backgroundColor: 'white',
    },
    visible: {
      width: '510px',
      height: '400px',
    },
    hidden: {
      width: '0px',
      height: '0px',
    },
    c: function(sendView) {
      return R.merge(
        this.base,
        sendView ? this.visible : this.hidden
      )
    },
    container: {
      width: '100%',
      height: '100%',
      padding: '15px',
    },
    controlGroup: {
      margin: '10px 0px',
      height: '28px',
    },
    label: {
      fontWeight: 'bold',
      margin: '0px 10px 0px 0px',
    },
    textinput: {
      base: {
        width: '310px',
        padding: '2px',
        fontSize: '16px',
        border: 'none',
        borderBottom: '1px solid grey',
        outline: 'none',
      },
      focus: {
        borderBottom: '2px solid blue',
      },
      c: function(focused) {
        return R.merge(
          this.base,
          focused ? this.focus : {}
        )
      },
    },
    textarea: {
      base: {
        resize: 'none',
        outline: 'none',
        margin: '12px',
        padding: '12px',
        border: '2px solid grey',
        width: '450px',
        height: '270px',
        fontSize: '18px',
      },
      focus: {
        border: '2px solid blue',
      },
      c: function(focused) {
        return R.merge(
          this.base,
          focused ? this.focus : {}
        )
      },
    },
    sendButton: {
      position: 'absolute',
      color: 'white',
      backgroundColor: 'blue',
      borderRadius: '3px',
      fontSize: '16px',
      padding: '5px 10px',
      width: '70px',
      marginLeft: '30px',
    },
  },
  showSendViewBtn: {
    base: {
      transition: 'width 0.5s',
      position: 'fixed',
      bottom: '20px',
      right: '5px',
      color: 'white',
      backgroundColor: 'red',
      borderRadius: '3px',
      fontSize: '18px',
      padding: '7px 12px',
    },
    visible: {
      width: '510px',
    },
    hidden: {
      width: '98px',
    },
    c: function(sendView) {
      return R.merge(
        this.base,
        sendView ? this.visible : this.hidden
      )
    },
  },
}
