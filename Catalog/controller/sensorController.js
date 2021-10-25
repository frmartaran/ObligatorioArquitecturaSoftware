const router = require('express').Router()

router.get('/', async (req, res) => {
    res.send('funciona')
    console.log('funcioan!')
})

module.exports = router