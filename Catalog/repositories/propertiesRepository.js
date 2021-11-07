const Repository = require('./repository')


const PropertyRepository = {
    
    findAll: async () => {
        var query = Repository.Property.findAll();
        let properties = await query;
        return properties;
    },

    findById: async (id) => {
        var query = Repository.Property.findOne({ where: { Name: id } });
        let property = await query;
        return property;
    },

    Add: async (data) => {
        var query = Repository.Property.create(data)
        var newProperty = await query
        return newProperty
    },

    Delete: async (id) => {
        var query = Repository.Property.findOne({ where: { Name: id },include: Repository.Sensor });
        let property = await query;
        await property.destroy()
        return "deleted"
    }
}
module.exports = PropertyRepository
