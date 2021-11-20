const express = require('express');
const router = express.Router();
const {eval} = require('../../controllers/alarms')


router.post(
    '/evaluate',
    eval
)

module.exports = router