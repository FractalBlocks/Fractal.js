// data service module
/*
  this module contains all data fetching and inyecting logic
*/
const serverName = 'http://localhost:4000'
const F = require('../../lib')

// TODO: abstract all things like auto-notify and helper functions and include a service constructor(F.service) in Fractal core

// data model
let dataObj = {
  connected: false,
  state: 'outdated', // outdated | fetching | updated | error
  messages: [],
  info: {
    unread: 0,
    read: 0,
    pages: 1,
  },
  page: 1,
}

let eventQueue = []

// data is a proxy for dataObj that automatically notify changes
let data = new Proxy(dataObj, {
  set: function(target, name, value) {
    target[name] = value
    notify(name)
    return true
  },
})


let subscribers = -1

// initial fetch of data
function init(success, err) {
  data.state = 'fetching'
  F.data.fetchAll([
    {
      url: serverName + '/api/emails',
      response: res => res.json(),
    },
    {
      url: serverName + '/api/emails/page/' + data.page,
      response: res => res.json(),
    }
  ], function([info, messages]) {
    data.info = info
    data.messages = messages
    data.state = 'updated'
    success()
  })
}

let events = {
  pageChanged: function(page, success, error) {
    data.state = 'fetching'
    F.data.fetch({
      url: serverName + '/api/emails/page/' + page,
      response: res => res.json(),
      success: function(messages) {
        data.messages = messages
        data.page = page
        data.state = 'updated'
        success()
      },
      error: function(err) {
        error(err)
        data.state = 'error'
      },
    })
  },
  messageRead: function(uid, success, error) {
    F.data.fetch({
      url: serverName + '/api/emails/email/' + uid + '/read',
      response: res => res.json(),
      success,
      error,
    })
  },
}

function notify(name) {
  for (var subscriber in subscribers) {
    let parts = subscriber.split('_')
    if (parts[parts.length - 1] === name) {
      subscribers[subscriber](data[name])
    }
  }
}

function notifyAll() {
  for (var subscriber in subscribers) {
    if (data[subscriber]) {
      subscribers[subscriber](data[subscriber])
    }
  }
}

module.exports = {
  serverName,
  get: function(key) {
    return data[key]
  },
  emit: function(name, value, success, error) {
    if (events[name]) {
      if (data.connected) {
        events[name](value, success, error)
      } else {
        eventQueue.push({name, value, success, error})
      }
    } else {
      // no event handler detected
    }
  },
  connect: function(socket) {
    socket.on('connect', function(messages) {
      data.connected = true
      // event queue dispatching
      let promises = []
      let ev
      while (ev = eventQueue.pop()) {
        promises.push(new Promise(function(resolve, reject) {
          events[ev.name](ev.value, resolve, reject)
        }))
      }

      // TODO: handle errors
      Promise.all(promises)
        .then(() => init(() => 0, () => 0))
    })

    socket.on('data', function(msg) {
      data[msg.key] = msg.value
    })

    socket.on('disconnect', function(messages) {
      data.connected = false
    })
  },
  subscribeAll: function(subs) {
    // avoid a bug with flyd.on TODO: needs review
    if (subs != undefined) {
      if (subscribers == -1 && data.state == 'updated') {
        // notify all incoming subscribers in the rare case
        // that data has updated before subscribers are recolected
        subscribers = subs
        notifyAll()
      } else {
        subscribers = subs
      }
    }
  }
}


