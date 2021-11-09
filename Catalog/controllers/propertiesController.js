const router = require('express').Router()
const propertiesService = require('../services/propertiesService')
const authorizationService = require('../services/authorizationService')

router.get('/', async (req, res) => {
    let response = await authorizationService.AdminAuthorization(req)
    if(response.status === 200){
        const property = await propertiesService.findAll()
        res.send(property)
    }else{
        res.status(response.status)
        res.send(response.message)
    }
})

router.get('/:id', async (req, res) => {
    let response = await authorizationService.AdminAuthorization(req)
    if(response.status === 200){
        const property = await propertiesService.findById(req.params.id)
        res.send(property)
    }else{
        res.status(response.status)
        res.send(response.message)
    }
})

router.post('/', async (req, res) => {
    let response = await authorizationService.AdminAuthorization(req)
    if(response.status === 200){
        const body = req.body
        const property = await propertiesService.Add(body)
        res.send(property)
    }else{
        res.status(response.status)
        res.send(response.message)
    }
})

router.delete('/:id', async (req, res) => {
    let response = await authorizationService.AdminAuthorization(req)
    if(response.status === 200){
        const property = await propertiesService.Delete(req.params.id)
        res.send(property)
    }else{
        res.status(response.status)
        res.send(response.message)
    }
})

module.exports = router