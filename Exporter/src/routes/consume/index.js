const express = require('express')
const router = express.Router()
const {consume} = require('../../controllers/consume')
const {audit,createBaseAudit} = require('../../../../Audits')
const baseAudit = createBaseAudit(process.env.APP_NAME)
router.get(
    '/consume/:ID',
    consume,
    audit(baseAudit)
    )

module.exports = router
