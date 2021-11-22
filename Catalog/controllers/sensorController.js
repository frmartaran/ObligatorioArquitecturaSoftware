const router = require('express').Router()
const sensorService = require('../services/sensorService')
const authorizationService = require('../services/authorizationService')

router.get('/', async (req, res) => {
    const sensors = await sensorService.findAll()
    res.send(sensors)
})

router.get('/:id', async (req, res) => {
    const sensors = await sensorService.findById(req.params.id)
    res.send(sensors)
})


router.post('/', async (req, res) => {
    let response = await authorizationService.AdminAuthorization(req)
    if(response.status === 200){
        const body = req.body
        const sensor = await sensorService.Add(body)
        res.send(sensor)
    }else{
        res.status(response.status)
        res.send(response.message)
    }
})

router.post('/:sensorId', async (req, res) => {
    let response = await authorizationService.AdminAuthorization(req)
    if(response.status === 200){
        const sensorId = req.params.sensorId
        const property = req.body
        const sensorProperty = await sensorService.AddProperty(sensorId, property)
        res.send(sensorProperty)
    }else{
        res.status(response.status)
        res.send(response.message)
    }

})

router.delete('/:id', async (req, res) => {
    let response = await authorizationService.AdminAuthorization(req)
    if(response.status === 200){
        const sensor = await sensorService.Delete(req.params.id)
        res.send(sensor)
    }else{
        res.status(response.status)
        res.send(response.message)
    }

})

router.delete('/:sensorId/property/:propertyName', async (req, res) => {
    let response = await authorizationService.AdminAuthorization(req)
    if(response.status === 200){
        const sensorId = req.params.sensorId
        const propertyName = req.params.propertyName
        const sensorProperty = await sensorService.DeleteSensorProperty(sensorId, propertyName)
        res.send(sensorProperty)
    }else{
        res.status(response.status)
        res.send(response.message)
    }
})

module.exports = router