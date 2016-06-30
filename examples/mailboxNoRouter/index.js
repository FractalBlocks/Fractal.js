require('../styles.css')
const F = require('../../lib')
const io = require('socket.io-client')

const data = require('./data') // data service


/* IDEAs:
  - Add send email feature
  - Complete the restAPI for emails (avoids send all email content!!)
  - Implement an IMAP server for emails
  - Add a chat
  - Improve chat with a SMTP server
*/

let socket = io(data.serverName, {})

data.connect(socket)

let engine = F.run({
  root: F.log(require('./mailbox')),
  tasks: {
    data: F.tasks.data.task(data.emit),
  },
  drivers: {
    view: require('../../lib/drivers/view')('#app'),
    data: require('../../lib/drivers/event')(data.subscribeAll),
  },
})

// If hot module replacement is enabled
if (module.hot) {
  // We accept updates to the top component
  module.hot.accept('./mailbox', (comp) => {
    // Mutate the variable holding our component
    let module = require('./mailbox')
    engine.reattach(module)
  })
}

