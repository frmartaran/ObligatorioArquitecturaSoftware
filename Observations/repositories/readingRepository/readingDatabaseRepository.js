const Repository = require('./../mongoRepository');
const { handleInfraError } = require('../../../ErrorHandler/infra_error');
const prefixMethod = "mongoDB";

const readingDatabaseRepository = {
    Get: (dateFrom, pageLength) => {
        try {
            let query = Repository.Reading.find({
                "date": {
                    "$gt": dateFrom
                }
            }, {
                '_id': 0,
                '__v': 0,
                'transformedData._id': 0,
                'properties._id': 0
            })
                .sort({ 'date': 1 })
                .limit(pageLength);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get`, message: err.message, payload: `DateFrom: ${dateFrom}` })
            throw err;
        }
    },
    GetLastDailyDate: async () => {
        try {
            let query = Repository.DailyReading.find({}).sort({ 'date': -1 }).limit(1);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get Last Daily Date`, message: err.message })
            throw err;
        }
    },
    GetDailyReadingsFromRawData: async (startDate, endDate) => {
        try {
            let query = Repository.Reading.aggregate([
                { $match: { date: { $gte: startDate, $lte: endDate } } },
                { $sort: { ESN: 1, date: 1 } },
                { $unwind: "$transformedData" },
                {
                    $group:
                    {
                        _id: {
                            ESN: "$ESN",
                            sensorMeasurementName: "$transformedData.propertyName",
                            yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" } }
                        },
                        totalSumValues: { $sum: "$transformedData.value" },
                        totalCountValues: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        ESN: "$_id.ESN",
                        sensorMeasurementName: "$_id.sensorMeasurementName",
                        date: { $toDate: "$_id.yearMonthDay" },
                        averageValue: { $divide: ["$totalSumValues", "$totalCountValues"] },
                        totalSumValues: 1,
                        totalCountValues: 1
                    }
                }
            ]);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get Daily Readings From Raw Data`, message: err.message, payload: `StartDate: ${startDate}, EndDate: ${endDate}` })
            throw err;
        }
    },
    GetSensorDailyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        try {
            let query = Repository.Reading.aggregate([
                { $match: { ESN: ESN, date: { $gte: startDate, $lte: endDate } } },
                { $unwind: "$transformedData" },
                { $match: { 'transformedData.propertyName': measurementType } },
                {
                    $group:
                    {
                        _id: { yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" } } },
                        totalSumValues: { $sum: "$transformedData.value" },
                        totalCountValues: { $sum: 1 }
                    }
                },
                { $project: { _id: 0, date: { $toDate: "$_id.yearMonthDay" }, averageValue: { $divide: ["$totalSumValues", "$totalCountValues"] } } }
            ]);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get Sensor Daily Readings From Raw Data By Measurement Type`, message: err.message, payload: `StartDate: ${startDate}, EndDate: ${endDate}, MeasurementType: ${measurementType}, ESN: ${ESN}` })
            throw err;
        }
    },
    GetSensorMonthlyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        try {
            let query = Repository.Reading.aggregate([
                { $match: { ESN: ESN, date: { $gte: startDate, $lte: endDate } } },
                { $unwind: "$transformedData" },
                { $match: { 'transformedData.propertyName': measurementType } },
                {
                    $group:
                    {
                        _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                        totalSumValues: { $sum: "$transformedData.value" },
                        totalCountValues: { $sum: 1 }
                    }
                },
                { $project: { _id: 0, month: "$_id.month", year: "$_id.year", totalSumValues: 1, totalCountValues: 1 } }
            ]);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get Sensor Monthly Readings From Raw Data By Measurement Type`, message: err.message, payload: `StartDate: ${startDate}, EndDate: ${endDate}, MeasurementType: ${measurementType}, ESN: ${ESN}` })
            throw err;
        }
    },
    GetSensorYearlyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        try {
            let query = Repository.Reading.aggregate([
                { $match: { ESN: ESN, date: { $gte: startDate, $lte: endDate } } },
                { $unwind: "$transformedData" },
                { $match: { 'transformedData.propertyName': measurementType } },
                {
                    $group:
                    {
                        _id: { year: { $year: "$date" } },
                        totalSumValues: { $sum: "$transformedData.value" },
                        totalCountValues: { $sum: 1 }
                    }
                },
                { $project: { _id: 0, year: "$_id.year", totalSumValues: 1, totalCountValues: 1 } }
            ]);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get Sensor Yearly Readings From Raw Data By Measurement Type`, message: err.message, payload: `StartDate: ${startDate}, EndDate: ${endDate}, MeasurementType: ${measurementType}, ESN: ${ESN}` })
            throw err;
        }
    },
    GetSensorDailyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        try {
            let query = Repository.DailyReading.find({
                "ESN": ESN,
                "sensorMeasurementName": measurementType,
                "date": {
                    $gte: startDate,
                    $lte: endDate
                }
            }, { '_id': 0, 'ESN': 0, 'sensorMeasurementName': 0, 'totalSumValues': 0, 'totalCountValues': 0, '__v': 0 });
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get Sensor Daily Readings By Measurement Type`, message: err.message, payload: `StartDate: ${startDate}, EndDate: ${endDate}, MeasurementType: ${measurementType}, ESN: ${ESN}` })
            throw err;
        }
    },
    GetSensorMonthlyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        try {
            let query = Repository.DailyReading.aggregate([
                { $match: { ESN: ESN, sensorMeasurementName: measurementType, date: { $gte: startDate, $lte: endDate } } },
                {
                    $group:
                    {
                        _id: { month: { $month: "$date" }, year: { $year: "$date" } },
                        totalSumValues: { $sum: "$totalSumValues" },
                        totalCountValues: { $sum: "$totalCountValues" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        month: "$_id.month",
                        year: "$_id.year",
                        averageValue: { $divide: ["$totalSumValues", "$totalCountValues"] },
                        totalSumValues: 1,
                        totalCountValues: 1
                    }
                }
            ]);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get Sensor Monthly Readings By Measurement Type`, message: err.message, payload: `StartDate: ${startDate}, EndDate: ${endDate}, MeasurementType: ${measurementType}, ESN: ${ESN}` })
            throw err;
        }
    },
    GetSensorYearlyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        try {
            let query = Repository.DailyReading.aggregate([
                { $match: { ESN: ESN, sensorMeasurementName: measurementType, date: { $gte: startDate, $lte: endDate } } },
                {
                    $group:
                    {
                        _id: { year: { $year: "$date" } },
                        totalSumValues: { $sum: "$totalSumValues" },
                        totalCountValues: { $sum: "$totalCountValues" }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        year: "$_id.year",
                        averageValue: { $divide: ["$totalSumValues", "$totalCountValues"] },
                        totalSumValues: 1,
                        totalCountValues: 1
                    }
                }
            ]);
            return query;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get Sensor Yearly Readings By Measurement Type`, message: err.message, payload: `StartDate: ${startDate}, EndDate: ${endDate}, MeasurementType: ${measurementType}, ESN: ${ESN}` })
            throw err;
        }
    }
}
module.exports = readingDatabaseRepository