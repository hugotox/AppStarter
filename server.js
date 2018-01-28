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


app.prepare()
  .then(() => {
    const server = express()

    server.use(cookieParser())
    server.use(bodyParser.urlencoded({extended: true}))
    server.use(bodyParser.json())

    server.post('/api/login', (req, res) => {
      const {username, password} = req.body
      if (username === 'test' && password === '123') {
        const token = jwt.sign({
          username: username,
          xsrfToken: crypto.createHash('md5').update(username).digest('hex')
        }, jwtSecret, {
          expiresIn: 60 * 60
        })
        res.status(200).json({
          success: true,
          message: 'Enjoy your token',
          token: token
        })
      } else {
        res.status(403).json({
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
        jwt.verify(token, jwtSecret, (err) => {
          if (!err) {
            response.success = true
            response.message = ''
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