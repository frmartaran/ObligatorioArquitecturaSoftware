const Repository = require('./repository')
const { handleInfraError } = require('../../ErrorHandler/infra_error')
const prefixMethod = "UserRepository"

const UserRepository = {

    findById: async (id) => {
        try{
        var query = Repository.User.findOne({ where: { name: id } });
        let user = await query;
        return user;
        }catch(err){
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Find By ID`, message: err.message,payload: id})
        }
    },
    add: async (data) =>{
        let result = null;
        try{
            var query = Repository.User.create(data);
            var newUser = await query;
            result = newUser
        }catch(err){
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add`, message: err.message, payload: JSON.stringify(data)})
        }
        finally{
            return result;
        }
    }
}
module.exports = UserRepository
