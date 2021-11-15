const express = require('express')
const router = express.Router()

const {
    retriveHealthcheck
}= require('../../controllers/healthcheck')

router.get(
    '/health',
    retriveHealthcheck
)

module.exports = router