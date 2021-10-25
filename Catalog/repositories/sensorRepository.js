const properties = require('../model/properties');
const Repository = require('./repository')


const SensorRepository = {
    
    findAll: async () => {
        var query = Repository.Sensor.findAll();//indAll({include: properties});
        let sensors = await query;
        return sensors;
    },

    findById: async (id) => {
        var query = Repository.Sensor.findOne({ where: { ESN: id } });
        let sensors = await query;
        return sensors;
    }
}
module.exports = SensorRepository
