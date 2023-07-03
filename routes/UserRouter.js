const router = require('express').Router()
const controller = require('../controllers/UserController')
const middleware = require('../middleware')

router.get('/',middleware.stripToken, middleware.verifyToken, controller.getAllUsers)
router.get(
    '/:id',
    middleware.stripToken,
    middleware.verifyToken,
    controller.getUserById
)

router.put(
    '/:id',
    midddleware.stripToken,
    middleware.verifyToken,
    controller.updateUser
)

router.delete(
    '/:id',
    middleware.stripToken,
    middleware.verifyToken,
    controller.deleteUser
)

module.exports = router