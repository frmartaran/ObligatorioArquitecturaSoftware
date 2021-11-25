const router = require('express').Router();
const ReadingsController = require('./readingsController');

const readingsController = new ReadingsController();

router.get('/readings', (req, res, next) => {
    try {
        readingsController.getReadings(req, res, next);
    } catch (err) {
        next(err)
    }
})

router.get('/averages', (req, res, next) => {
    try {
        readingsController.getAverages(req, res, next);
    } catch (err) {
        next(err)
    }    
})

module.exports = router;