const router = require('express').Router()

const sensorController = require('./sensorController')
const propertiesController = require('./propertiesController')
const loginController = require('./loginController')

router.use('/sensor',sensorController)
router.use('/property',propertiesController)
router.use('/login',loginController)

module.exports = router

