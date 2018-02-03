require('dotenv').config()
const express = require('express')
const next = require('next')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 3000
const app = next({dev})
const handle = app.getRequestHandler()
const jwtSecret = process.env.JWT_SECRET || 'jwtSecret'
const jwtExpireMinutes = 60


app.prepare()
  .then(() => {
    const server = express()

    server.use(cookieParser())
    server.use(bodyParser.urlencoded({extended: true}))
    server.use(bodyParser.json())

    // TODO: move dynamic URLS to separate file
    // dynamic URLS
    server.get('/dynamic/:id', (req, res) => {
      const actualPage = '/dynamic'
      const queryParams = { id: req.params.id }
      app.render(req, res, actualPage, queryParams)
    })

    server.post('/api/login', (req, res) => {
      const {username, password} = req.body
      if (username === 'test' && password === '123') {
        const token = jwt.sign({
          userType: 'USER',
          username: username,
          xsrfToken: crypto.createHash('md5').update(username).digest('hex')
        }, jwtSecret, {
          expiresIn: 60 * jwtExpireMinutes
        })
        res.status(200).json({
          success: true,
          message: 'Enjoy your token',
          token: token
        })

      } else if (username === 'staff' && password === '123') {
        const token = jwt.sign({
          userType: 'STAFF',
          username: username,
          xsrfToken: crypto.createHash('md5').update(username).digest('hex')
        }, jwtSecret, {
          expiresIn: 60 * jwtExpireMinutes
        })
        res.status(200).json({
          success: true,
          message: 'Enjoy your token',
          token: token
        })

      } else {
        res.status(400).json({
          success: false,
          message: 'Authentication failed'
        })
      }
    })

    // used by the loginRequired component to verify if user is authenticated
    server.post('/api/verify-token', (req, res) => {
      const {token} = req.body
      const response = {
        success: false,
        message: 'Invalid token'
      }
      if (token) {
        jwt.verify(token, jwtSecret, (err, decoded) => {
          if (!err) {
            response.success = true
            response.message = ''
            response.username = decoded.username
            response.userType = decoded.userType
          }
        })
      }
      res.status(200).json(response)
    })

    server.get('*', (req, res) => {
      return handle(req, res)
    })

    server.listen(port, (err) => {
      if (err) throw err
      console.log('> Ready on http://localhost:' + port)
    })
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })