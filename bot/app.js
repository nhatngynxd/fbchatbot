require('dotenv').config()
const express = require('express'),
  { urlencoded, json } = require('body-parser'),
  app = express(),
  { initWebRoutes } = require('./routes/routes.js')
const OAuth2Server = require('oauth2-server'),
  Request = OAuth2Server.Request,
  Response = OAuth2Server.Response
var dal = require('./dal/dal')

app.use(urlencoded({ extended: true }))

app.use(json())

// OAuth2
app.oauth = new OAuth2Server({
  model: require('./dal/model'),
  accessTokenLifetime: 60 * 60,
  allowBearerTokensInQueryString: true,
})

exports.obtainToken = (req, res) => {
  req.headers['content-type'] = 'application/x-www-form-urlencoded'
  var request = new Request(req)
  var response = new Response(res)

  return app.oauth
    .token(request, response)
    .then(function (token) {
      res.json(token)
    })
    .catch(function (err) {
      res.status(err.code || 500).json(err)
    })
}

exports.authenticateRequest = (req, res, next) => {
  var request = new Request(req)
  var response = new Response(res)

  return app.oauth
    .authenticate(request, response)
    .then(function (token) {
      dal.listen(req, res, next)
      next()
    })
    .catch(function (err) {
      res.status(err.code || 500).json(err)
    })
}
//------------------------

initWebRoutes(app)

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
