const Repository = require('./mongoRepository')

const readingDatabaseRepository = {
    Add: async (data) => {
        const reading = new Repository.Reading(data);
        return reading.save();
    },
    AddManyReadings: async (data) => {
        const reading = Repository.Reading.insertMany(data);
        return reading;
    },
    Get: (dateFrom, pageLength) => {
        let query = Repository.Reading.find({
            "date": {
                "$gt": dateFrom
            }
        }, {'_id': 0, 
            '__v': 0, 
            'transformedData._id': 0, 
            'properties._id': 0
        })
        .sort({'date': 1})
        .limit(pageLength);
        return query;
    },
    GetLastDailyDate: async () => {
        let query = Repository.DailyReading.find({}).sort({'date': -1}).limit(1);
        return query;
    },
    GetDailyReadingsFromRawData: async (startDate, endDate) => {
        let query = Repository.Reading.aggregate([
            { $match: { date: { $gte: startDate, $lte: endDate }}},
            { $sort: { ESN: 1, date: 1}},
            { $unwind : "$transformedData" },
            { $group: 
                { 
                    _id: {
                        ESN: "$ESN", 
                        sensorMeasurementName: "$transformedData.propertyName", 
                        yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" }}, 
                        date: "$date"
                    }, 
                    totalSumValues: {$sum: "$transformedData.value"},
                    totalCountValues: {$sum: 1}
                }
            },
            { $project: { 
                _id: 0, 
                ESN: "$_id.ESN", 
                sensorMeasurementName: "$_id.sensorMeasurementName", 
                date: "$_id.date", 
                averageValue: { $divide: [ "$totalSumValues", "$totalCountValues" ]}, 
                totalSumValues: 1, 
                totalCountValues: 1
            }}
        ]);
        return query;
    },
    GetSensorDailyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = Repository.Reading.aggregate([
            { $match: { ESN: ESN, date: { $gte: startDate, $lte: endDate } }},
            { $unwind : "$transformedData"},
            { $match: { 'transformedData.propertyName': measurementType }},
            { $group: 
                { 
                    _id: {yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" }}, date: "$date"}, 
                    totalSumValues: {$sum: "$transformedData.value"},
                    totalCountValues: {$sum: 1}
                }
            },
            { $project: { _id: 0, date: "$_id.date", averageValue: { $divide: [ "$totalSumValues", "$totalCountValues" ]}}}
        ]);
        return query;
    },
    GetSensorMonthlyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = Repository.Reading.aggregate([
            { $match: { ESN: ESN, date: { $gte: startDate, $lte: endDate } }},
            { $unwind : "$transformedData"},
            { $match: { 'transformedData.propertyName': measurementType }},
            { $group: 
                { 
                    _id: {month: {$month: "$date"}, year: {$year: "$date"}}, 
                    totalSumValues: {$sum: "$transformedData.value"},
                    totalCountValues: {$sum: 1}
                }
            },
            { $project: { _id: 0, month: "$_id.month", year: "$_id.year", totalSumValues: 1, totalCountValues: 1}}
        ]);
        return query;
    },
    GetSensorYearlyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = Repository.Reading.aggregate([
            { $match: { ESN: ESN, date: { $gte: startDate, $lte: endDate } }},
            { $unwind : "$transformedData"},
            { $match: { 'transformedData.propertyName': measurementType }},
            { $group: 
                { 
                    _id: {year: {$year: "$date"}}, 
                    totalSumValues: {$sum: "$transformedData.value"},
                    totalCountValues: {$sum: 1}
                }
            },
            { $project: { _id: 0, year: "$_id.year", totalSumValues: 1, totalCountValues: 1}}
        ]);
        return query;
    },
    GetSensorDailyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = Repository.DailyReading.find({
            "ESN": ESN,
            "sensorMeasurementName": measurementType,
            "date": {
                $gte: startDate,
                $lte: endDate
            }
        }, {'_id': 0, 'ESN': 0, 'sensorMeasurementName': 0, 'totalSumValues': 0, 'totalCountValues': 0, '__v': 0});
        return query;
    },
    GetSensorMonthlyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = Repository.DailyReading.aggregate([
            { $match: { ESN: ESN, sensorMeasurementName: measurementType, date: { $gte: startDate, $lte: endDate }}},
            { $group: 
                { 
                    _id: {month: {$month: "$date"}, year: {$year: "$date"}}, 
                    totalSumValues: {$sum: "$totalSumValues"},
                    totalCountValues: {$sum: "$totalCountValues"}
                }
            },
            { $project: { 
                _id: 0, 
                month: "$_id.month", 
                year: "$_id.year", 
                averageValue: { $divide: [ "$totalSumValues", "$totalCountValues" ]}, 
                totalSumValues: 1, 
                totalCountValues: 1}
            }
        ]);
        return query;
    },
    GetSensorYearlyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = Repository.DailyReading.aggregate([
            { $match: { ESN: ESN, sensorMeasurementName: measurementType, date: { $gte: startDate, $lte: endDate }}},
            { $group: 
                { 
                    _id: {year: {$year: "$date"}}, 
                    totalSumValues: {$sum: "$totalSumValues"},
                    totalCountValues: {$sum: "$totalCountValues"}
                }
            },
            { $project: { 
                _id: 0, 
                year: "$_id.year", 
                averageValue: { $divide: [ "$totalSumValues", "$totalCountValues" ]}, 
                totalSumValues: 1, 
                totalCountValues: 1}
            }
        ]);
        return query;
    },
    AddDailyReadings: async (data) => {
        const reading = Repository.DailyReading.insertMany(data);
        return reading;
    },
}
module.exports = readingDatabaseRepository