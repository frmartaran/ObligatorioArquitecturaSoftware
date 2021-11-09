const router = require('express').Router()
const userService = require('../services/userService')
var jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    const user = req.body
    let response = await userService.validateUser(user)
    if(response === true){
        let payload = {"rol": "Admin"}
        let token = jwt.sign(payload,"secret")
        res.send(token)
    }else{
        res.status(404)
        res.send("no se encontro el usuario")
    }
})



module.exports = router