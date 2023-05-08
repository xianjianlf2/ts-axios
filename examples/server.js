const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const WebpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(WebpackConfig)

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: '/__build__/',
    stats: {
      colors: true,
      chunks: false
    }
  })
)

app.use(
  webpackHotMiddleware(compiler, {
    log: false,
    heartbeat: 2000
  })
)
app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8080
module.exports = app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`)
})

const router = express.Router()

registerSimpleRouter()

registerBaseRouter()

registerErrorRouter()

registerExtendRouter()

registerInterceptorRouter()

app.use(router)

function registerErrorRouter() {
  router.get('/error/get', function(req, res) {
    if (Math.random() > 0.5) {
      res.json({
        msg: `hello world`
      })
    } else {
      res.status(500)
      res.end()
    }
  })

  router.get('/error/timeout', function(req, res) {
    setTimeout(() => {
      res.json({
        msg: `hello world`
      })
    }, 3000)
  })
}

function registerBaseRouter() {
  router.get('/base/get', function(req, res) {
    res.json(req.query)
  })

  router.post('/base/post', function(req, res) {
    res.json(req.body)
  })

  router.post('/base/buffer', function(req, res) {
    const msg = []
    req.on('data', chunk => {
      if (chunk) {
        msg.push(chunk)
      }
    })
    req.on('end', () => {
      let buf = Buffer.concat(msg)
      res.json(buf.toJSON())
    })
  })
}

function registerSimpleRouter() {
  router.get('/simple/get', function(req, res) {
    res.json({
      code: 100,
      message: 'aaaaa',
      data: {
        name: 'name',
        age: 18
      }
    })
  })
}

function registerExtendRouter() {
  router.get('/extend/get', function(req, res) {
    res.json(req.body)
  })
  router.post('/extend/post', function(req, res) {
    res.json(req.body)
  })
  router.options('/extend/options', function(req, res) {
    res.json(req.body)
  })
  router.delete('/extend/delete', function(req, res) {
    res.json(req.body)
  })
  router.head('/extend/head', function(req, res) {
    res.json(req.body)
  })
  router.put('/extend/put', function(req, res) {
    res.json(req.body)
  })
  router.patch('/extend/patch', function(req, res) {
    res.json(req.body)
  })
  router.get('/extend/user', function(req, res) {
    res.json({
      code: 0,
      message: 'ok',
      result: {
        name: 'jack',
        age: 18
      }
    })
  })
}

function registerInterceptorRouter() {
  router.get('/interceptor/get', function(req, res) {
    res.end('hello')
  })
}
