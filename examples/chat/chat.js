const R = require('ramda')
const h = require('snabbdom/h')
const F = require('../../lib')

const emitTask = F.tasks.socketio.types.emit


module.exports = F.def({
  init: ({key}) => ({
    key,
    username: 'Anonimous',
    text: '',
    messages: [],
  }),
  inputs: {
    textChange: (ctx, Action, controlName, text) => Action.TextChange(controlName, text),
    sendMessage: (ctx, Action, username, content) => [
      Action.MessageSended(content),
      ['socket', emitTask('messages', {sender: username, content: content})],
    ],
    receiveMessage: (ctx, Action, msgObj) => Action.MessageReceived(msgObj),
  },
  actions: {
    TextChange: [[String], (controlName, text, m) => R.evolve({[controlName]: R.always(text)}, m)],
    MessageSended: [[String], (content, m) => R.evolve({messages: R.append({sender: '@@owner', content})}, m)],
    MessageReceived: [[Object], (msgObj, m) => R.evolve({messages: R.append(msgObj)}, m)],
  },
  interfaces: {
    view: (ctx, i, m) => h('div', [
      h('div', {style: styles.title}, 'FractalChat'),
      h('div', {style: styles.mainContainer}, [
        h('label', 'Username: '),
        h('input', {on: {change: (ev) => i.textChange('username', ev.target.value)}}),
        h('div', {style: styles.messageContainer},
          m.messages.map(
            msgObj => (msgObj.sender == '@@owner') ? h('div', 'You: ' + msgObj.content) : h('div', msgObj.sender + ': ' + msgObj.content)
          )
        ),
        h('input', {on: {change: (ev) => i.textChange('text', ev.target.value)}}),
        h('button', {on: {click: () => i.sendMessage(m.username, m.text)}}, 'Send'),
      ]),
    ]),
    socket: (ctx, i, m) => ({
      messages: i.receiveMessage,
    }),
  },
})

let styles = {
  title: {
    ...F.css.noSelectable,
    cursor: 'pointer',
    fontFamily: 'cursive',
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'purple',
    marginLeft: '10px',
  },
  mainContainer: {
    margin: '15px',
  },
  messageContainer: {
    margin: '15px',
  }
}
