const router = require('express').Router()
const userService = require('../services/userService')
var jwt = require('jsonwebtoken');


router.get('/', async (req, res) => {
    let user = new Object();
    user.name  = req.query.name;
    user.password = req.query.password;
    let response = await userService.validateUser(user)
    if(response){
        let token = createToken(response)
        res.send(token)
    }else{
        res.status(404)
        res.send("no se encontro el usuario")
    }
})

router.post('/', async (req, res) => {
    const user = req.body
    let response = await userService.createUser(user)
    if(response){
        let token = createToken(response)
        res.send(token)
    }else{
        res.status(500)
        res.send("no se pudo insertar el usuario")
    }
})

function createToken(user){
    var payload = new Object();
    payload.rol = user.role;
    if(user.createdAt){
        payload.registered=user.createdAt;
    }
    return token = jwt.sign(payload,"secret")
}


module.exports = router