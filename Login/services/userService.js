const UserRepository = require('../repositories/userRepository')
const ExporterUserRepository = require('../repositories/exporterUserRepository')

const UserService = {

    validateUser: async (user) => {
        let name = user.name 
        let password = user.password
        let dbUser = await UserRepository.findById(name)
        
        if(dbUser != null && dbUser.password === password){
            return dbUser;
        }
        return false;
    },
    createExporterUser: async (user) =>{
        const currentDate = new Date()
        user.consumeDate = currentDate.getTime()
        let dbUser = await ExporterUserRepository.add(user);
        return dbUser;
    },
    updateDateExporterUser: async (id,time) =>{
        let dbUser = await ExporterUserRepository.update(id,time);
        return dbUser;
    },
    getConsumeDateExporterUser: async (id) =>{
        let dbUser = await ExporterUserRepository.findById(id);
        if(dbUser){
            return dbUser.consumeDate;
        }else{
            return null
        }
    }
}
module.exports = UserService
