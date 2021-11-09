const router = require('express').Router()
var jwt = require('jsonwebtoken');


router.post('/', async (req, res) => {
    const body = req.body
    console.log(body)

    let payload = {"rol": "Admin"}
    let token = jwt.sign(payload,"secret")

    res.send(token)

})



module.exports = router