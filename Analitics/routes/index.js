const express = require('express');
const router = express.Router();
const reports = require('./reports')

router.use(reports)

module.exports = router
