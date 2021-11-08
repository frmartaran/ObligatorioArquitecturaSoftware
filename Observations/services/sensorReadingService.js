const SensorReadingRepository = require('../repositories/sensorReadingRepository')

const SensorReadingService = {
    Add: async (data) => {
        let newSensorReading = await SensorReadingRepository.Add(data);
        return newSensorReading;
    }
}
module.exports = SensorReadingService