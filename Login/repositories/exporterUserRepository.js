const Repository = require('./repository')
const { handleInfraError } = require('../../ErrorHandler/infra_error')
const prefixMethod = "ExporterUserRepository"
const ExporterUserRepository = {

    findById: async (id) => {
        try {
            var query = Repository.ExporterUser.findOne({ where: { id: id } });
            let user = await query;
            if(!user){
                let error = new Error('Not found')
                error.statusCode = 404
                throw error
            }
            return user;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Find By ID`, message: err.message, payload: id })
            throw err
        }
    },
    add: async (data) => {
        try {
            var query = Repository.ExporterUser.create(data);
            var newUser = await query;
            return newUser
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add exporter user`, message: err.message, payload: JSON.stringify(data) })
            throw err
        }
    },
    update: async (id, time) => {
        try {
            var query = Repository.ExporterUser.update({ consumeDate: time }, { where: { id: id } });
            var newUser = await query;
            result = newUser
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Update`, message: err.message, payload: `UserID:${id}, Timestamp: ${time}` })
            throw err
        }
    }
}
module.exports = ExporterUserRepository
