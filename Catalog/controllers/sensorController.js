const router = require('express').Router()
const sensorservice = require('../services/sensorService')

router.get('/', async (req, res) => {
    const sensors = await sensorservice.findAll()
    res.send(sensors)
})

router.get('/:id', async (req, res) => {
    const sensors = await sensorservice.findById(req.params.id)
    res.send(sensors)
})

router.post('/', async (req, res) => {
    const body = req.body
    const sensor = await sensorservice.Add(body)
    res.send(sensor)

})

router.delete('/:id', async (req, res) => {
    const sensor = await sensorservice.Delete(req.params.id)
    res.send(sensor)

})

router.post('/:sensorId', async (req, res) => {
    const sensorId = req.params.sensorId
    const property = req.body
    const sensorProperty = await sensorservice.AddProperty(sensorId, property)
    res.send(sensorProperty)

})

router.delete('/:sensorId/property/:propertyName', async (req, res) => {
    const sensorId = req.params.sensorId
    const propertyName = req.params.propertyName
    const sensorProperty = await sensorservice.DeleteServiceProperty(sensorId, propertyName)
    res.send(sensorProperty)

})

module.exports = router