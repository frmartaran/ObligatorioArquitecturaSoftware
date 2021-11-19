const express = require('express')
const router = express.Router()

const healthcheck = require('./healthcheck')
const consume = require('./consume') 

router.use(healthcheck)
router.use(consume)

module.exports = router