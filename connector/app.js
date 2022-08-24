require('dotenv').config()
const express = require('express'),
  { urlencoded, json } = require('body-parser'),
  app = express(),
  { initWebRoutes } = require('./routes/routes')

app.use(urlencoded({ extended: true }))

app.use(json())

initWebRoutes(app)

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port)
})
