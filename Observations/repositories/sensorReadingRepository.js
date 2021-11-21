const Repository = require('./mysqlRepository')

const SensorReadingRepository = {
    Add: async (data) => {
        var query = Repository.sensorReading.create(data, {
            include: [
                {
                    association: Repository.sensorReading.associations.properties,
                },
                {
                    association: Repository.sensorReading.associations.transformedData,
                },
            ]
        });
        var newSensorReading = await query;
        return newSensorReading;
    },
}
module.exports = SensorReadingRepository