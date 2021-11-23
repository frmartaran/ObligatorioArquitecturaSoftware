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

router.post('/exporter', async (req, res) => {
    const user = req.body
    let response = await userService.createExporterUser(user)
    if(response){
        let url = createURL(response)
        res.send(url)
    }else{
        res.status(500)
        res.send("no se pudo crear el usuario")
    }
})

router.put('/exporter/:id', async (req, res) => {
    const userID = req.params.id
    const newTimestamp = req.query.consumeDate
    let response = await userService.updateDateExporterUser(userID,newTimestamp)
    if(response){
        res.send('acutalizado con exito')
    }else{
        res.status(500)
        res.send("no se pudo actualizar el usuario")
    }
})

router.get('/exporter/consumeDate/:id', async (req, res) => {
    const userID = req.params.id
    let response = await userService.getConsumeDateExporterUser(userID)
    if(response){
        res.send(response.toString())
    }else{
        res.status(400)
        res.send("no se pudo obtener el consumerDate del usuario")
    }
})

function createToken(user){
    var payload = new Object();
    payload.rol = user.role;
    return token = jwt.sign(payload,"secret")
}

function createURL(user){
    const url = `${process.env.BASE_URL}${process.env.EXPORTER_PORT}${process.env.EXPORTER_PATH}${user.id}`;
    return url
}

module.exports = router