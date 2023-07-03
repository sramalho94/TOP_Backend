const Router = require('express').Router()
const UserRouter = require('./UserRouter')
const AuthRouter = require('./AuthRouter')

Router.use('/auth', AuthRouter)
Router.use('/users', UserRouter)

module.exports = Router
