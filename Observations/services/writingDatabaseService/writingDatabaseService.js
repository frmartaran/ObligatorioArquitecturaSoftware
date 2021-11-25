const databaseRepository = require('../../repositories/writingRepository/writingDatabaseRepository');

const writingDatabaseService = {
    Add: async (data) => {
        let newSensorReading = await databaseRepository.Add(data);
        return newSensorReading;
    },
    AddDailyReadings: async (data) => {
        let newSensorReading = await databaseRepository.AddDailyReadings(data);
        return newSensorReading;
    }
}
module.exports = writingDatabaseService