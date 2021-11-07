const Repository = require('./repository')


const SensorRepository = {
    
    findAll: async () => {
        var query = Repository.Sensor.findAll({ include: Repository.Property });
        let sensors = await query;
        return sensors;
    },

    findById: async (id) => {
        var query = Repository.Sensor.findOne({ where: { ESN: id },include: Repository.Property });
        let sensors = await query;

        return sensors;
    },

    Add: async (data) => {
        var query = Repository.Sensor.create(data)
        var newSensor = await query
        return newSensor
    },

    Delete: async (id) => {
        var query = Repository.Sensor.findOne({ where: { ESN: id },include: Repository.Property });
        let sensors = await query;
        await sensors.destroy()
        return "deleted"
    },
}
module.exports = SensorRepository
