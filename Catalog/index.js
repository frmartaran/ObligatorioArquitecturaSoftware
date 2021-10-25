const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controller/controller')
const app = express()
const repo = require('./repositories/sensorRepository')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

//app.get('/catalog', controller)

app.get('/api/sensors', async (req, res) => {
    const sensors = await repo.findAll()//repo.Sensor.findAll()
    res.send(sensors)
})

app.get('/api/sensors/:id', async (req, res) => {
    const sensors = await repo.findById(req.params.id)
    res.send(sensors)
})

app.listen(3000, () => {

})