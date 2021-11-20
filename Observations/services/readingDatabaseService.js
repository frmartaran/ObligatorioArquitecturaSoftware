const ReadingDatabaseRepository = require('../repositories/readingDatabaseRepository');

const ReadingDatabaseService = {
    Add: async (data) => {
        let newSensorReading = await ReadingDatabaseRepository.Add(data);
        return newSensorReading;
    },
    Get: (dateFrom) => {
        let query = ReadingDatabaseRepository.Get(dateFrom);
        return query;
    },
    GetLastDailyDate: async () => {
        let query = await ReadingDatabaseRepository.GetLastDailyDate();
        return query;
    },
    GetDailyReadings: async (startDate, endDate) => {
        let query = await ReadingDatabaseRepository.GetDailyReadings(startDate, endDate);
        return query;
    },
    AddDailyReadings: async (data) => {
        let newSensorReading = await ReadingDatabaseRepository.AddDailyReadings(data);
        return newSensorReading;
    }
}
module.exports = ReadingDatabaseService