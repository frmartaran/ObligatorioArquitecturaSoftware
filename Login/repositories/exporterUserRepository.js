const Repository = require('./repository')

const ExporterUserRepository = {

    findById: async (id) => {
        try{
            var query = Repository.ExporterUser.findOne({ where: { id: id } });
            let user = await query;
            return user;
        }catch(err){
            console.log(err)
            return null
        }
    },
    add: async (data) =>{
        let result = null;
        try{
            var query = Repository.ExporterUser.create(data);
            var newUser = await query;
            result = newUser
        }catch(err){
            console.log(err);
        }
        finally{
            return result;
        }
    },
    update: async (id,time) =>{
        let result = null;
        try{
            var query = Repository.ExporterUser.update({consumeDate: time},{where:{ id: id}});
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
module.exports = ExporterUserRepository
