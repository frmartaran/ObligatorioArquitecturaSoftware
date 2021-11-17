const router = require('express').Router();
const ReadingsController = require('./readingsController');

const readingsController = new ReadingsController();

router.get('/readings', (req, res) => {
    readingsController.getReadings(req, res)
})

module.exports = router;