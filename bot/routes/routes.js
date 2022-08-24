const express = require('express')
var appfunc = require('../app')
var dal = require('../dal/dal')

let router = express.Router()

let initWebRoutes = (app) => {
  //Bot framework
  router.post('/api/messages', appfunc.authenticateRequest)

  //OAuth2
  router.all('/oauth/token', appfunc.obtainToken)

  return app.use('/', router)
}

module.exports = {
  initWebRoutes,
}
