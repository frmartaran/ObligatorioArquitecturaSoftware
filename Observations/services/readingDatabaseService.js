const ReadingDatabaseRepository = require('../repositories/readingDatabaseRepository');

const ReadingDatabaseService = {
    Add: async (data) => {
        let newSensorReading = await ReadingDatabaseRepository.Add(data);
        return newSensorReading;
    }
}
module.exports = ReadingDatabaseService