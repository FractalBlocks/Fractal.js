// data service module
/*
  this module contains all data fetching and inyecting logic
*/
const F = require('../../lib')


let serverName = 'http://localhost:4000'

module.exports = F.service({
  serverName,
  store: {
    connected: false,
    state: 'outdated', // outdated | fetching | updated | error
    messages: [],
    info: {
      unread: 0,
      read: 0,
      pages: 1,
    },
    page: 1,
  },
  init: function(data, emit, success, err) {
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
  },
  connect: function(data, emit, socket, success) {
    socket.on('connect', function(messages) {
      data.connected = true
      success()
    })

    socket.on('data', function(msg) {
      data[msg.key] = msg.value
    })

    socket.on('disconnect', function(messages) {
      data.connected = false
    })
  },
  events: data => ({
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
  }),
})
