const R = require('ramda')
const h = require('snabbdom/h')
const F = require('../../lib')

const sendValueTask = F.tasks.value.types.send
const emitTask = F.tasks.emitter.types.emit


module.exports = F.def({
  init: ({key}) => ({
    key,
    server: 'http://localhost:4000',
    connected: false,
    username: 'Anonimous',
    text: '',
    messages: [],
  }),
  inputs: {
    setConnected: (ctx, Action, connected) => Action.SetConnected(connected),
    connectServer: (ctx, Action, serverName) => ['socketService_value', sendValueTask(serverName)],
    textChange: (ctx, Action, controlName, text) => Action.TextChange(controlName, text),
    sendMessage: (ctx, Action, username, content) => [
      Action.MessageSended(content),
      ['socketService', emitTask('messages', {sender: username, content: content}, () => 0)],
    ],
    receiveMessage: (ctx, Action, msgObj) => Action.MessageReceived(msgObj),
  },
  actions: {
    SetConnected: [[R.T], (connected, m) => R.evolve({connected: R.always(connected)}, m)],
    TextChange: [[String], (controlName, text, m) => R.evolve({[controlName]: R.always(text)}, m)],
    MessageSended: [[String], (content, m) => R.evolve({
      text: R.always(''),
      messages: R.append({sender: '@@owner', content}),
    }, m)],
    MessageReceived: [[Object], (msgObj, m) => R.evolve({messages: R.append(msgObj)}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', [
      h('div', {style: styles.title}, [
        'FractalChat',
        h('div', {style: styles.connection.c(m.connected)}),
      ]),
      h('div', {style: styles.mainContainer}, [
        h('div', {style: styles.row}, [
          h('label', {style: styles.label}, 'Server: '),
          h('input', {
            style: styles.input,
            props: {value: m.server},
            on: {change: (ev) => i.textChange('server', ev.target.value)}
          }),
          h('button', {on: {click: () => i.connectServer(m.server)}}, 'Connect to server ...'),
        ]),
        h('div', {style: styles.row}, [
          h('label', {style: styles.label}, 'Username: '),
          h('input', {style: styles.input, on: {change: (ev) => i.textChange('username', ev.target.value)}}),
        ]),
        h('div', {style: styles.messageContainer},
          m.messages.map(
            msgObj => (msgObj.sender == '@@owner') ? h('div', {style: styles.messageSended}, [
              h('span', 'You :  ' + msgObj.content),
            ]) : h('div', {style: styles.messageReceived}, [
              h('span', msgObj.sender + ' :  ' + msgObj.content),
            ])
          )
        ),
        h('input', {
          style: styles.inputLarge,
          props: {
            value: m.text,
          },
          on: {
            change: (ev) => i.textChange('text', ev.target.value),
            keyup: (ev) => {
              if (ev.keyCode == 13 && m.text != '') {
                i.textChange('text', m.text)
                i.sendMessage(m.username, m.text)
              }
            },
          },
        }),
        h('button', {on: {click: () => (m.text != '') ? i.sendMessage(m.username, m.text) : 0}}, 'Send'),
      ]),
    ]),
    socketService_data: (ctx, i, m) => ({
      connected: i.setConnected,
    }),
    socketService: (ctx, i, m) => ({
      messages: i.receiveMessage,
    }),
  },
})

let styles = {
  title: {
    ...F.style.noSelectable,
    cursor: 'pointer',
    fontFamily: 'cursive',
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'purple',
    marginLeft: '10px',
  },
  row: {
    margin: '10px',
  },
  label: {
    margin: '5px',
  },
  input: {
    margin: '5px',
  },
  inputLarge: {
    margin: '5px',
    width: '360px',
  },
  mainContainer: {
    margin: '15px',
  },
  messageContainer: {
    margin: '25px',
    width: '400px',
  },
  messageSended: {
    textAlign: 'end',
  },
  messageReceived: {
    textAlign: 'start',
  },
  connection: {
    base: {
      width: '20px',
      height: '20px',
      marginLeft: '20px',
      borderRadius: '10px',
      backgroundColor: 'red',
      display: 'inline-block',
    },
    connected: {
      backgroundColor: 'green',
    },
    c: function(connected) {
      return R.merge(this.base, (connected) ? this.connected : {})
    },
  },
}
