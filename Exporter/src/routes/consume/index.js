const express = require('express')
const router = express.Router()
const {consume} = require('../../controllers/consume')

router.get(
    '/consume/:ID',
    consume
    )

module.exports = router
