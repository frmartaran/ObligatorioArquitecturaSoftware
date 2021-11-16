const Repository = require('./repository')

const UserRepository = {

    findById: async (id) => {
        var query = Repository.User.findOne({ where: { name: id } });
        let user = await query;
        return user;
    },
    add: async (data) =>{
        let result = null;
        try{
            var query = Repository.User.create(data);
            var newUser = await query;
            result = newUser
        }catch(err){
            console.log(err);
        }
        finally{
            return result;
        }
    }
}
module.exports = UserRepository
