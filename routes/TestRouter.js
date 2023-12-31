const router = require('express').Router()
const controller = require('../controllers/TestController')
const middleware = require('../middleware')

router.get(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getAllTest
)
router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.getTestById
)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  controller.createTest
)
router.post(
  '/anon',
  controller.createTest
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.updateTest
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.deleteTest
)

module.exports = router
