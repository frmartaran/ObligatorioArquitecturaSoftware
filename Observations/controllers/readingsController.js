const readingDatabaseService = require('../services/readingDatabaseService');

module.exports = class ReadingsController {
    async getReadings (req, res) {
        let dateFromTimestamp = Number(req.query.dateFrom);
        let dateFrom = new Date(dateFromTimestamp);
        let query = readingDatabaseService.Get(dateFrom);
        query.exec((err, reading) => {
            res.send(reading);
        });            
    }
}