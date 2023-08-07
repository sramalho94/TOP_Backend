const Router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

Router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)
Router.post('/register', controller.Register)
Router.post('/login', controller.Login)
Router.put(
  '/update-password',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)

module.exports = Router
