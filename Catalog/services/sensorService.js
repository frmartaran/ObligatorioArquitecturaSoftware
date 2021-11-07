const SensorRepository = require('../repositories/sensorRepository')
const SensorpropertiesRepository = require('../repositories/sensorPropertiesRepository')

const SensorService = {
    
    findAll: async () => {
        let sensors = await SensorRepository.findAll()
        return sensors;
    },

    findById: async (id) => {
        let sensors = await SensorRepository.findById(id)
        return sensors;
    },

    Add: async (data) => {
        let newSensor = await SensorRepository.Add(data)
        return newSensor
    },

    Delete: async (id) => {
        let sensors = await SensorRepository.Delete(id)
        return sensors
    },

    AddProperty: async (sensorId, property) => {
        const propertyName = property.Name
        const data = {
            sensorESN: sensorId,
            propertyName: propertyName
        }
        let newSensor = await SensorpropertiesRepository.Add(data)
        return newSensor
    },

    DeleteServiceProperty: async (sensorId, propertyId) => {
        let sensorProperty = await SensorpropertiesRepository.findById(sensorId, propertyId)
        return await SensorpropertiesRepository.Delete(sensorProperty)
    },
}
module.exports = SensorService
