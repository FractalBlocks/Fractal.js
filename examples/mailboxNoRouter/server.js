// socket.io server for mailbox

'use strict'

let app = require('koa')()
let router = require('koa-router')()
let cors = require('kcors')
let serve = require('koa-static')
let uuid = require('node-uuid')
let bodyParser = require('koa-bodyparser')
let server = require('http').Server(app.callback()),
  io = require('socket.io')(server)

// email DB stuff

const PouchDB = require('pouchdb')
PouchDB.plugin(require('pouchdb-find'))
PouchDB.plugin(require('pouchdb-upsert'))

require('pouchdb/extras/websql')

const emailDB = new PouchDB('./dbs/emails.db', {adapter: 'websql'})

emailDB.allDocs()
.then(function (result) {
  if (result.rows.length == 0) {
    emailDB.bulkDocs(getInitialMessages()).then(function (result) {
      getInitialMessages()
    }).catch(function (err) {
      console.log(err);
    })
  }
}).catch(function (err) {
  console.log(err);
})


let pageSize = 50


let sockets = []

app.use(cors())
app.use(bodyParser())

// use it in production
// app.use(serve('public'))

router.get('/api/emails', function *() {
  this.body = yield getInfo()
})

router.get('/api/emails/page/:number', function *() {
  let page = this.params.number
  let results = yield emailDB.allDocs({
    startkey: 'fractalplatform@gmail.com',
    descending: false,
    skip: (page - 1) * pageSize,
    limit: pageSize,
    include_docs: true,
  })
  this.body = results.rows.map(r => r.doc)
})

router.get('/api/emails/email/:uid', function *() {
  let results = yield emailDB.allDocs({
    startkey: 'fractalplatform@gmail.com/' + this.params.uid,
    descending: false,
    limit: 1,
    include_docs: true,
  })
  this.body = (results.rows[0]) ? results.rows[0].doc : 'notFound'
})

router.get('/api/emails/email/:uid/read', function *() {
  try {
    console.log(this.params.uid)
    let email = yield getEmail(this.params.uid)
    let res = yield emailDB.upsert(email._id, function(doc) {
      doc.state = 'read'
      return doc
    })
    if (sockets[0]) {
      let info = yield getInfo()
      sockets[0].emit('data', {key: 'info', value: info})
    }
    this.body = 'updated'
  } catch(e) {
    this.body = 'notFound'
  }
})

router.post('/api/emails/new', function *() {
  let newMessage = this.request.body
  let _id = generateId('fractalplatform@gmail.com', newMessage.title.toLowerCase())
  let res = emailDB.put(newMessage, _id)
  this.body = 'created'
})


app
  .use(router.routes())
  .use(router.allowedMethods())


io.on('connection', function(socket) {
  console.log('Client connected')

  sockets.push(socket)
  socket.on('disconnect', function() {
    sockets.slice(sockets.indexOf(socket), 1)
  })
})


server.listen(process.env.PORT || 4000, process.env.IP || 'localhost', function() {
  console.log('Server listening...')
})

// data stuff
function getEmail(uid) {
  return emailDB.allDocs()
  .then(function(res) {
    try {
      let emailId = res.rows.filter(r => r.id.split('/')[2] === uid)[0].id
      return emailDB.get(emailId)
    } catch(e) {
      return Promise.reject('notFound')
    }
  })
}

function getInfo() {
  return emailDB.createIndex({index: {fields: ['state']}})
  .then(function() {
    return Promise.all([
      emailDB.find({selector: {state: {$eq: 'read'}}}),
      emailDB.find({selector: {state: {$eq: 'unread'}}})
    ]).then(function(res) {
      let numMessages = res[0].docs.length + res[1].docs.length
      return Promise.resolve({
        read: res[0].docs.length,
        unread: res[1].docs.length,
        pages: Math.floor(numMessages / pageSize) + 1,
      })
    })
  })
}

function generateId(ownerName, title) {
  return ownerName + '/' + (new Date()).toJSON() + '/' + uuid.v4()
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
    sleep(2)
  }


  return messages
}

// helper method
function sleep(ms) {
  var start = new Date().getTime(), expire = start + ms;
  while (new Date().getTime() < expire) { }
  return;
}
