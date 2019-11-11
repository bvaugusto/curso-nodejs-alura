require('marko/node-require')

const express = require('express')
const markoExpress = require('marko/express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routes = require('../app/routes/routes')

const app = express()

app.use(cors())
app.use(markoExpress())

app.use('/estatico', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method;
      delete req.body._method;
      return method;
    }
}))

routes(app)

module.exports = app