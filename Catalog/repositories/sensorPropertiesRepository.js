const Repository = require('./repository')
const { handleInfraError } = require('../../ErrorHandler/infra_error')
const prefixMethod = "SensorPropertyRepository"

const sensorPropertiesRepository = {
    findById: async (sensorId, propertyName) => {
        try {
            var query = Repository.SensorProperty.findOne({ where: { sensorESN: sensorId, propertyName: propertyName } });
            let sensorProperty = await query;
            return sensorProperty;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Find By ID`, message: err.message, payload: `SensorID: ${sensorId}, PropName: ${propertyName}` })
            throw err
        }
    },

    Add: async (data) => {
        try {
            var query = Repository.SensorProperty.create(data)
            var newSensorProperty = await query
            return newSensorProperty
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add`, message: err.message, payload: JSON.stringify(data) })
            throw err
        }
    },

    Delete: async (sensorProperty) => {
        try {
            await sensorProperty.destroy()
            return "deleted"
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Find By ID`, message: err.message, payload: sensorProperty })
            throw err
        }
    },

    Put: async (data, sensorId, ropertyName) => {
        try {
            var query = Repository.SensorProperty.update(
                { minUnitValue: data.minUnitValue, maxUnitValue: data.maxUnitValue},
                { where: { sensorESN: sensorId,  propertyName: ropertyName} }
              );
            let newSensorPropety = await query;
            return newSensorPropety
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add`, message: err.message, payload:JSON.stringify(data) })
            throw err
        }
    },
}
module.exports = sensorPropertiesRepository
