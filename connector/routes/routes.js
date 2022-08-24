const express = require('express')
const {
  verifyTokenMessenger,
  webHookEndPoints,
  sendBotMessage,
} = require('../hooks')

let router = express.Router()

let initWebRoutes = (app) => {
  router.get('/', (req, res) => {
    res.send('hello m')
  })

  // Facebook hooks
  router.get('/webhook', verifyTokenMessenger)
  router.post('/webhook', webHookEndPoints)

  //get message from bot and post
  router.post(
    '/messenger/v3/conversations/6006255876057507/activities',
    sendBotMessage,
  )

  return app.use('/', router)
}

module.exports = {
  initWebRoutes,
}
