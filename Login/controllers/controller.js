const router = require('express').Router()
const userController = require('./userController')
const { audit,createBaseAudit } = require('../../Audits');
const baseAudit = createBaseAudit(process.env.APP_NAME)
router.use('/user',userController,audit(baseAudit))

module.exports = router

