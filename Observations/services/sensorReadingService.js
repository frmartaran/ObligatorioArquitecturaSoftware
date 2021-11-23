const SensorReadingRepository = require('../repositories/sensorReadingRepository')

const SensorReadingService = {
    Sync: async () => {
        await SensorReadingRepository.Sync();
    },
    Add: async (data) => {
        let newSensorReading = await SensorReadingRepository.Add(data);
        return newSensorReading;
    }
}
module.exports = SensorReadingService