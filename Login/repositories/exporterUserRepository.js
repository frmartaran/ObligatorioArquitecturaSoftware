const Repository = require('./repository')
const { handleInfraError } = require('../../ErrorHandler/infra_error')
const prefixMethod = "ExporterUserRepository"
const ExporterUserRepository = {

    findById: async (id) => {
        try {
            var query = Repository.ExporterUser.findOne({ where: { id: id } });
            let user = await query;
            return user;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Find By ID`, message: err.message, payload: id })
        }
    },
    add: async (data) => {
        let result = null;
        try {
            var query = Repository.ExporterUser.create(data);
            var newUser = await query;
            result = newUser
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add exporter user`, message: err.message, payload: JSON.stringify(data) })
        }
        finally {
            return result;
        }
    },
    update: async (id, time) => {
        let result = null;
        try {
            var query = Repository.ExporterUser.update({ consumeDate: time }, { where: { id: id } });
            var newUser = await query;
            result = newUser
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Update`, message: err.message, payload: `UserID:${id}, Timestamp: ${time}` })
        }
        finally {
            return result;
        }
    }
}
module.exports = ExporterUserRepository
