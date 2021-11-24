const express = require('express')
const router = express.Router()

const {validateParams} = require('../../middleware')
const {generateReport} =require('../../controllers/reports')
const {audit,createBaseAudit}=require('../../../Audits')

router.get('/reports',
    validateParams(),
    generateReport(),
    audit(createBaseAudit(process.env.APP_NAME))
)