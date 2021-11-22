const Repository = require('./mongoRepository')
const { handleInfraError } = require('../../ErrorHandler/infra_error')
const prefixMethod = "ReadingDB"

const readingDatabaseRepository = {
    Add: async (data) => {
        try {
            const reading = new Repository.Reading(data);
            return reading.save();
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add`, message: err.message, payload: JSON.stringify(data) })
        }
    },

    Get: (dateFrom) => {
        try {
            let query = Repository.Reading.find({
                "date": {
                    "$gte": dateFrom
                }
            });
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get`, message: err.message, payload: `DateFrom: ${dateFrom}` })
        }
    },

    GetLastDailyDate: async () => {
        try {
            let query = Repository.DailyReading.find({}).sort({ 'date': -1 }).limit(1);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get Last Daily Date`, message: err.message })
        }
    },
    GetDailyReadings: async (startDate, endDate) => {
        try {
            let query = Repository.Reading.aggregate([
                { $match: { date: { $gte: startDate, $lt: endDate } } },
                { $sort: { ESN: 1, date: 1 } },
                { $unwind: "$transformedData" },
                { $group: { _id: { ESN: "$ESN", sensorMeasurementName: "$transformedData.finalUnit", yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } }, averageValue: { $avg: "$transformedData.value" } } },
                { $project: { _id: 0, ESN: "$_id.ESN", sensorMeasurementName: "$_id.sensorMeasurementName", date: startDate, averageValue: 1 } }
            ]);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: GetDailyReadings`, message: err.message, payload: `StartDate: ${startDate}, EndDate: ${endDate}` })
        }
    },

    AddDailyReadings: async (data) => {
        try {
            console.log(data);
            const reading = Repository.DailyReading.insertMany(data);
            return reading;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add Daily Readings`, message: err.message, payload: JSON.stringify(data) })
        }
    },
}
module.exports = readingDatabaseRepository