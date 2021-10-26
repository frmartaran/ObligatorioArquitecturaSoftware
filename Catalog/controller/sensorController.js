const router = require('express').Router()
//const repo = require('../../repositories/sensorRepository')
const repo = require('../repositories/sensorRepository')

router.get('/', async (req, res) => {
    const sensors = await repo.findAll()//repo.Sensor.findAll()
    res.send(sensors)
})

router.get('/:id', async (req, res) => {
    const sensors = await repo.findById(req.params.id)
    res.send(sensors)
})

router.post('/', async (req, res) => {
    const body = req.body
    const sensor = await repo.Add(body)
    res.send(sensor)

})

module.exports = router