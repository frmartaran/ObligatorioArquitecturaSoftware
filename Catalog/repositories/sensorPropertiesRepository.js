const Repository = require('./repository')


const sensorPropertiesRepository = {
    findById: async (sensorId, propertyName) => {
        var query = Repository.SensorProperty.findOne({ where: { sensorESN: sensorId, propertyName: propertyName } });
        let sensorProperty = await query;
        return sensorProperty;
    },

    Add: async (data) => {
        
        var query = Repository.SensorProperty.create(data)
        var newSensorProperty = await query
        return newSensorProperty
    },

    Delete: async (sensorProperty) => {
        await sensorProperty.destroy()
        return "deleted"
    }
}
module.exports = sensorPropertiesRepository
