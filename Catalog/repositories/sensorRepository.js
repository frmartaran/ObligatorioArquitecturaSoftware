const Repository = require('./repository')


const SensorRepository = {
    
    findAll: async () => {
        var query = Repository.Sensor.findAll();//findAll({include: properties});
        let sensors = await query;
        return sensors;
    },

    findById: async (id) => {
        var query = Repository.Sensor.findOne({ where: { ESN: id } });
        let sensors = await query;
        var propertiesQuery = await Repository.Properties.findAll({ where: { SensorESN: id } });
  
        let returnSensor = {
            ESN: sensors.ESN,
            model: sensors.model,
            name: sensors.name,
            location: sensors.location,
            properties: propertiesQuery
        }
        return returnSensor;
    },

    Add: async (data) => {
        var query = Repository.Sensor.create(data)
        var newSensor = await query
        return newSensor
    }
}
module.exports = SensorRepository
