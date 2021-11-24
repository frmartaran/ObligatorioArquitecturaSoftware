const router = require('express').Router()
const userService = require('../services/userService')
var jwt = require('jsonwebtoken');

router.get('/',
    async (req, res, next) => {
        try {
            let user = new Object();
            user.name = req.query.name;
            user.password = req.query.password;
            req.event = 'GET'
            req.data = `Usuario: ${user.name}, Password: ${user.password}`
            let response = await userService.validateUser(user)
            let token = createToken(response)
            res.send(token)
            next()
        } catch (err) {
            next(err)
        }
    }
)

router.post('/exporter',
    async (req, res, next) => {
        try{
            const user = req.body
            let response = await userService.createExporterUser(user)
            req.event = 'POST /exporter'
            req.data = JSON.stringify(user)
            let url = createURL(response)
            res.send(url)
            next()
        }catch(err){
            next(err)
        }
    }
)

router.put('/exporter/:id',
    async (req, res, next) => {
        try {
            const userID = req.params.id
            const newTimestamp = req.query.consumeDate
            req.event = 'PUT /exporter/:id'
            req.data = `Usuario: ${userID}, Nuevo Timestamp: ${newTimestamp}`
            let response = await userService.updateDateExporterUser(userID, newTimestamp)
            res.send('acutalizado con exito')
            next()
        } catch (err) {
            next(err)
        }
    }
)

router.get('/exporter/consumeDate/:id',
    async (req, res, next) => {
        const userID = req.params.id
        req.event = 'GET /exporter/consumeDate/:id'
        req.data = `UserID: ${userID}`
        let response = await userService.getConsumeDateExporterUser(userID)
        if (response) {
            res.send(response.toString())
        } else {
            res.status(400)
            res.send("no se pudo obtener el consumerDate del usuario")
        }
        next()
    }
)

function createToken(user) {
    var payload = new Object();
    payload.rol = user.role;
    return token = jwt.sign(payload, "secret")
}

function createURL(user) {
    const url = `${process.env.BASE_URL}${process.env.EXPORTER_PORT}${process.env.EXPORTER_PATH}${user.id}`;
    return url
}

module.exports = router