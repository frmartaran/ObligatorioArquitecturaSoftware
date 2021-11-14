const router = require('express').Router()

const sensorController = require('./sensorController')
const propertiesController = require('./propertiesController')

router.use('/sensor',sensorController)
router.use('/property',propertiesController)

module.exports = router

