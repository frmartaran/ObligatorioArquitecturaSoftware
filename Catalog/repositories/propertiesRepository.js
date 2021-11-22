const Repository = require('./repository')
const { handleInfraError } = require('../../ErrorHandler/infra_error')

const PropertyRepository = {

    findAll: async () => {
        try {
            var query = Repository.Property.findAll();
            let properties = await query;
            return properties;
        }
        catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: 'Find All', message: err.message })
        }
    },

    findById: async (id) => {
        try {
            var query = Repository.Property.findOne({ where: { Name: id } });
            let property = await query;
            return property;
        }
        catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: 'Find All', message: err.message, payload: id })
        }
    },

    Add: async (data) => {
        try {
            var query = Repository.Property.create(data)
            var newProperty = await query
            return newProperty
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: 'Find All', message: err.message, payload: JSON.stringify(data) })
        }
    },

    Delete: async (id) => {
        try {
            var query = Repository.Property.findOne({ where: { Name: id }, include: Repository.Sensor });
            let property = await query;
            await property.destroy()
            return "deleted"
        }
        catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Find All`, message: err.message, payload: id })
        }
    }
}
module.exports = PropertyRepository
