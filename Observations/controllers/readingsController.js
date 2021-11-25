const readingDatabaseService = require('../services/readingDatabaseService');
const ReadingsLogic = require('../logic/readingsLogic');
const Config = require('../config/default.json');

const logic = new ReadingsLogic();

const pageLength = Config.pageLength;

module.exports = class ReadingsController {
    async getReadings(req, res, next) {
        let dateFromTimestamp = Number(req.query.dateFrom);
        let dateFrom = new Date(dateFromTimestamp);
        let query = await readingDatabaseService.Get(dateFrom, pageLength);
        res.send(query);
        next();
    };

    async getAverages(req, res, next) {
        let dateFromTimestamp = Number(req.query.dateFrom);
        let dateFrom = new Date(dateFromTimestamp);
        let dateToTimestamp = Number(req.query.dateTo);
        let dateTo = new Date(dateToTimestamp);
        let ESN = req.query.ESN;
        let averageType = req.query.averageType;
        let measurementType = req.query.measurementType;
        let differenceInTime = dateTo.getTime() - dateFrom.getTime();
        let differenceInDays = differenceInTime / (1000 * 3600 * 24);
        switch (averageType) {
            case Config.averageType.daily:
                logic.calculateDailyAverage(differenceInDays, dateFrom, dateTo, measurementType, ESN, res, next);
                break;
            case Config.averageType.monthly:
                logic.calculateMonthlyAverage(differenceInDays, dateFrom, dateTo, measurementType, ESN, res, next);
                break;
            case Config.averageType.yearly:
                logic.calculateYearlyAverage(dateFrom, dateTo, measurementType, ESN, res, next)
                break;
            default:
                break;
        }
    }
}