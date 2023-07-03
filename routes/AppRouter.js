const Router = require('express').Router()
const UserRouter = require('./UserRouter')

Router.use('/users', UserRouter)

module.exports = Router
