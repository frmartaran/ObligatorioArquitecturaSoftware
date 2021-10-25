const router = require('express').Router()

const sensorController = require('./sensorController')

router.use('/sensors',sensorController)

module.exports = router

