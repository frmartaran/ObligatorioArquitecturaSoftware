const ReadingDatabaseRepository = require('../repositories/readingDatabaseRepository');

const ReadingDatabaseService = {
    Add: async (data) => {
        let newSensorReading = await ReadingDatabaseRepository.Add(data);
        return newSensorReading;
    },
    Get: (dateFrom) => {
        let query = ReadingDatabaseRepository.Get(dateFrom);
        return query;
    }
}
module.exports = ReadingDatabaseService