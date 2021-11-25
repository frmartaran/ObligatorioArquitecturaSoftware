const SensorRepository = require('../repositories/sensorRepository')
const SensorpropertiesRepository = require('../repositories/sensorPropertiesRepository')
const sensorToQueue = require('../processes/sensorToQueue')

const SensorService = {
    
    findAll: async () => {
        let sensors = await SensorRepository.findAll()
        return sensors;
    },

    findById: async (sensorId) => {
        let sensors = await SensorRepository.findById(sensorId)
        return sensors;
    },

    Add: async (data) => {
        let newSensor = await SensorRepository.Add(data)
        return newSensor
    },

    Delete: async (sensorId) => {
        let sensors = await SensorRepository.Delete(sensorId)
        let updateGateway = await SensorService.UpdateGateway(sensorId, 'DELETE')
        return sensors
    },

    Put: async (data, sensorId) => {
        let newSensor = await SensorRepository.Put(data, sensorId)
        let updateGateway = await SensorService.UpdateGateway(sensorId, 'UPDATE')
        return newSensor
    },

    AddProperty: async (sensorId, property) => {
        const propertyName = property.Name
        const data = {
            sensorESN: sensorId,
            propertyName: propertyName,
            minUnitValue: property.minUnitValue,
            maxUnitValue: property.maxUnitValue
        }

        let newSensor = await SensorpropertiesRepository.Add(data)
        let updateGateway = await SensorService.UpdateGateway(sensorId, 'UPDATE')

        return newSensor
    },

    DeleteSensorProperty: async (sensorId, propertyId) => {
        let sensorProperty = await SensorpropertiesRepository.findById(sensorId, propertyId)
        let updateGateway = await SensorService.UpdateGateway(sensorId, 'UPDATE')
        return await SensorpropertiesRepository.Delete(sensorProperty)
    },

    UpdateGateway: async (sensorId, action) => {
        let sensor = await SensorService.findById(sensorId)
        const send = {
            action: action,
            sensor: sensor
        }
        return await sensorToQueue(send)
    },

    UpdateSensorProperty: async (data, sensorId, propertyId) => {
        let sensorProperty = await SensorpropertiesRepository.Put(data, sensorId, propertyId)
        let updateGateway = await SensorService.UpdateGateway(sensorId, 'UPDATE')
        return await sensorProperty
    },
}
module.exports = SensorService
