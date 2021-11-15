const express = require('express')
const router = express.Router()

const healthcheck = require('./healthcheck')

router.use(healthcheck)

module.exports = router