const express = require('express');
const router = express.Router();
const alarms = require('./alarms')

router.use(alarms)

module.exports = router
