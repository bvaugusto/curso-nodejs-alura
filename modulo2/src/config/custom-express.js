require('marko/node-require')

const express = require('express')
const markoExpress = require('marko/express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')

const sessaoAutenticacao = require('./sessao-autenticacao')
const routes = require('../app/routes/routes')
const templates = require('../app/views/template')

const app = express()

app.use(cors())
app.use(markoExpress())

app.use('/estatico', express.static('src/app/public'))

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      var method = req.body._method
      delete req.body._method
      return method
    }
}))

sessaoAutenticacao(app)
routes(app)

app.use(function (req, resp, next) {
    return resp.status(404).marko(templates.base.error404);
});

app.use(function (erro, req, resp, next) {
    return resp.status(500).marko(templates.base.error500);
});

module.exports = app;