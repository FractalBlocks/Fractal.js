// data service module
/*
  this module contains all data fetching and inyecting logic
*/
const F = require('../../lib')

let serverName = 'http://localhost:4000'
let pageSize = 50

let messages = getInitialMessages()

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
  init: function(data, success, err) {
    data.state = 'fetching'
    setTimeout(function() {
      data.info = getInfo()
      data.messages = messages.slice((data.page - 1) * pageSize, data.page * pageSize)
      data.state = 'updated'
      success()
    }, 500)
  },
  connect: function(data, socket, success) {
    setTimeout(function() {
      data.connected = true
      success()
    }, 500)
  },
  events: data => ({
    pageChanged: function(page, success, error) {
      data.state = 'fetching'
      setTimeout(function() {
        data.page = page
        data.messages = messages.slice((data.page - 1) * pageSize, data.page * pageSize)
        data.state = 'updated'
        success()
      }, 200)
    },
    messageRead: function(uid, success, error) {
      setTimeout(() => {
        for (let i = messages.length - 1; i >= 0; i--) {
          if (messages[i]._id ===  uid) {
            messages[i].state = 'read'
            data.info = getInfo()
            break
          }
        }
        success()
      }, 200)
    },
  }),
})


function getInfo() {
  return {
    read: messages.filter(m => m.state === 'read').length,
    unread: messages.filter(m => m.state === 'unread').length,
    pages: Math.floor(messages.length / 50) + 1,
  }
}

let uuid = 0

function generateId(ownerName, title) {
  return ownerName + '/' + (new Date()).toJSON() + '/' + uuid
  uuid++
}

function getInitialMessages() {

  let messages = [
    {
      title: 'Hello Fractal',
      sender: 'bryanlarson@google.com',
      content: 'My name is Bryan, I want to use your library. It is a very nice way to building apps!! so I am very excited about it!!',
      state: 'unread',
    },
    {
      title: 'Publish in my platform',
      sender: 'theblogger@gmail.com',
      content: 'I want to publish your library in my blog. I have some questions about, can we talk about Fractal via videocall?',
      state: 'unread',
    },
    {
      sender: 'fractalenthusiast@gmail.com',
      title: 'JS functional UIs',
      content: 'This is awesome!! It is simple and fast, thanks for that!!',
      state: 'unread',
    },
    {
      title: 'Give us consultory',
      sender: 'iamacto@startup.com',
      content: 'My name is Thomas, I am CTO of a web development enterprise. Can we talk about?',
      state: 'unread',
    },
  ]

  // generated messages
  for (let i = 0; i < 500; i++) {
    messages[i + 4] = {
      title: 'title ' + i,
      sender: 'bot' + i +'@bots.com',
      content: 'My name is Robot' + i + ', I am CTO of a Robot development enterprise. Can we talk about your library?',
      state: 'unread',
    }
  }

  for (let i = 0; i < messages.length; i++) {
    messages[i]._id = generateId('fractalplatform@gmail.com', messages[i].title.toLowerCase())
  }


  return messages
}

