const Repository = require('./mongoRepository')

const readingDatabaseRepository = {
    Add: async (data) => {
        const reading = new Repository.Reading(data);
        return reading.save();
    },
    Get: (dateFrom) => {
        let query = Repository.Reading.find({
            "date": {
                "$gte": dateFrom
            }
        });
        return query;
    },
    GetLastDailyDate: async () => {
        let query = Repository.DailyReading.find({}).sort({'date': -1}).limit(1);
        return query;
    },
    GetDailyReadings: async (startDate, endDate) => {
        let query = Repository.Reading.aggregate([
            { $match: { date: { $gte: startDate, $lt: endDate }}},
            { $sort: { ESN: 1, date: 1}},
            { $unwind : "$transformedData" },
            { $group: { _id:{ESN: "$ESN", sensorMeasurementName: "$transformedData.finalUnit", yearMonthDay: { $dateToString: { format: "%Y-%m-%d", date: "$date" }}}, averageValue: {$avg:"$transformedData.value"}}},
            { $project: { _id: 0, ESN: "$_id.ESN", sensorMeasurementName: "$_id.sensorMeasurementName", date: startDate, averageValue: 1}}
        ]);
        return query;
    },
    AddDailyReadings: async (data) => {
        console.log(data);
        const reading = Repository.DailyReading.insertMany(data);
        return reading;
    },
}
module.exports = readingDatabaseRepository