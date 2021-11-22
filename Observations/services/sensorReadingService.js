const SensorReadingRepository = require('../repositories/sensorReadingRepository')

const SensorReadingService = {
    Sync: () => {
        SensorReadingRepository.Sync();
    },
    Add: async (data) => {
        let newSensorReading = await SensorReadingRepository.Add(data);
        return newSensorReading;
    }
}
module.exports = SensorReadingService