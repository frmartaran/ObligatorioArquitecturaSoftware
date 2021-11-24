const router = require('express').Router()
const sensorService = require('../services/sensorService')
const authorizationService = require('../services/authorizationService')

router.get('/', async (req, res, next) => {
    try {
        const sensors = await sensorService.findAll()
        res.send(sensors)
    } catch (err) {
        next(err)
    }
})

router.get('/:id', async (req, res) => {
    try {
        const sensors = await sensorService.findById(req.params.id)
        res.send(sensors)
    } catch (err) {
        next(err)
    }
})


router.post('/', async (req, res) => {
    try {
        let response = await authorizationService.AdminAuthorization(req)
        if (response.status === 200) {
            const body = req.body
            const sensor = await sensorService.Add(body)
            res.send(sensor)
        } else {
            res.status(response.status)
            res.send(response.message)
        }
        next()
    } catch (err) {
        next(err)
    }
})

router.post('/:sensorId', async (req, res) => {
    try {
        let response = await authorizationService.AdminAuthorization(req)
        if (response.status === 200) {
            const sensorId = req.params.sensorId
            const property = req.body
            const sensorProperty = await sensorService.AddProperty(sensorId, property)
            res.send(sensorProperty)
        } else {
            res.status(response.status)
            res.send(response.message)
        }
        next()
    } catch (err) {
        next(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let response = await authorizationService.AdminAuthorization(req)
        if (response.status === 200) {
            const sensor = await sensorService.Delete(req.params.id)
            res.send(sensor)
        } else {
            res.status(response.status)
            res.send(response.message)
        }
        next()
    } catch (err) {
        next(err)
    }
})

router.delete('/:sensorId/property/:propertyName', async (req, res) => {
    try {
        let response = await authorizationService.AdminAuthorization(req)
        if (response.status === 200) {
            const sensorId = req.params.sensorId
            const propertyName = req.params.propertyName
            const sensorProperty = await sensorService.DeleteSensorProperty(sensorId, propertyName)
            res.send(sensorProperty)
        } else {
            res.status(response.status)
            res.send(response.message)
        }
        next()
    } catch (err) {
        next(err)
    }
})

router.put('/:sensorId', async (req, res) => {
    try {
        let response = await authorizationService.AdminAuthorization(req)
        if (response.status === 200) {
            const body = req.body
            const sensorId = req.params.sensorId
            const sensor = await sensorService.Put(body, sensorId)
            res.send(sensor)
        } else {
            res.status(response.status)
            res.send(response.message)
        }
        next()
    } catch (err) {
        next(err)
    }
})

router.put('/:sensorId/property/:propertyName', async (req, res) => {
    try {
        let response = await authorizationService.AdminAuthorization(req)
        if (response.status === 200) {
            const sensorId = req.params.sensorId
            const propertyName = req.params.propertyName
            const body = req.body
            const sensorProperty = await sensorService.UpdateSensorProperty(body, sensorId, propertyName)
            res.send(sensorProperty)
        } else {
            res.status(response.status)
            res.send(response.message)
        }
        next()
    } catch (err) {
        next(err)
    }
})


module.exports = router
