const router = require('express').Router();
const ReadingsController = require('./readingsController');

const readingsController = new ReadingsController();

router.get('/readings', (req, res) => {
    readingsController.getReadings(req, res)
})

router.get('/averages', (req, res) => {
    readingsController.getAverages(req, res)
})

module.exports = router;