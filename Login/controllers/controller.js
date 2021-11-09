const router = require('express').Router()
const userController = require('./userController')

router.use('/user',userController)

module.exports = router

