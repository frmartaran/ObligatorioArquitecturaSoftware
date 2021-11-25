const propertiesRepository = require('../repositories/propertiesRepository')

const propertiesService = {
    
    findAll: async () => {
        let properties = await propertiesRepository.findAll()
        return properties;
    },

    findById: async (id) => {
        let property = await propertiesRepository.findById(id)
        return property;
    },

    Add: async (data) => {
        let newProperty = await propertiesRepository.Add(data)
        return newProperty
    },

    Delete: async (id) => {
        let property = await propertiesRepository.Delete(id)
        return property
    },
}
module.exports = propertiesService
