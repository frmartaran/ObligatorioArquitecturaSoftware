const Repository = require('./mysqlRepository')

const SensorReadingRepository = {
    Add: async (data) => {
        var query = Repository.sensorReading.create(data, {
            include: [
                {
                    association: Repository.sensorReading.associations.catalogUnit,
                },
                {
                    association: Repository.sensorReading.associations.sensorMeasurement,
                },
            ]
        });
        var newSensorReading = await query;
        return newSensorReading;
    },
}
module.exports = SensorReadingRepository