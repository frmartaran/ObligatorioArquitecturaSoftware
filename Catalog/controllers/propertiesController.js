const router = require('express').Router()
const propertiesService = require('../services/propertiesService')

router.get('/', async (req, res) => {
    const property = await propertiesService.findAll()
    res.send(property)
})

router.get('/:id', async (req, res) => {
    const property = await propertiesService.findById(req.params.id)
    res.send(property)
})

router.post('/', async (req, res) => {
    const body = req.body
    const property = await propertiesService.Add(body)
    res.send(property)

})

router.delete('/:id', async (req, res) => {
    const property = await propertiesService.Delete(req.params.id)
    res.send(property)

})

module.exports = router