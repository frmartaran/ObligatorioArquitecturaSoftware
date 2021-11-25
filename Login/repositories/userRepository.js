const Repository = require('./repository')
const { handleInfraError } = require('../../ErrorHandler/infra_error')
const prefixMethod = "UserRepository"

const UserRepository = {

    findById: async (id) => {
        try{
        var query = Repository.User.findOne({ where: { name: id } });
        let user = await query;
        if(!user){
            let error = new Error('Not found')
            error.statusCode = 404
            throw error
        }
        return user;
        }catch(err){
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Find By ID`, message: err.message,payload: id})
            throw err
        }
    },
    add: async (data) =>{
        try{
            var query = Repository.User.create(data);
            var newUser = await query;
            return newUser
        }catch(err){
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add`, message: err.message, payload: JSON.stringify(data)})
            throw err
        }
    }
}
module.exports = UserRepository
