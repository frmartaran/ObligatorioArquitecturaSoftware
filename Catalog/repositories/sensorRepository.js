const Repository = require('./repository')
const { handleInfraError } = require('../../ErrorHandler/infra_error')
const prefixMethod = "SensorRepository"

const SensorRepository = {

    findAll: async () => {
        try {
            var query = Repository.Sensor.findAll({ include: Repository.Property });
            let sensors = await query;
            return sensors;
        }
        catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Find All`, message: err.message })
        }
    },

    findById: async (id) => {
        try {
            var query = Repository.Sensor.findOne({ where: { ESN: id }, include: Repository.Property });
            let sensors = await query;
            return sensors;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Find By ID`, message: err.message, payload: id })
        }
    },

    Add: async (data) => {
        try {
            var query = Repository.Sensor.create(data)
            var newSensor = await query
            return newSensor
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add`, message: err.message, payload:JSON.stringify(data) })
        }
    },

    Delete: async (id) => {
        try {
            var query = Repository.Sensor.findOne({ where: { ESN: id }, include: Repository.Property });
            let sensors = await query;
            await sensors.destroy()
            return "deleted"
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Delete`, message: err.message })
        }
    },
    
    Put: async (data, id) => {
        try {
            var query = Repository.Sensor.update(
                { model: data.model, name: data.name, location: data.location},
                { where: { ESN: id  } }
              );
            let newSensor = await query;
            return newSensor
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add`, message: err.message, payload:JSON.stringify(data) })
        }
    },
}


module.exports = SensorRepository
