const UserRepository = require('../repositories/userRepository')

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
    createUser: async (user) =>{
        let dbUser = await UserRepository.add(user);
        return dbUser;
    }
}
module.exports = UserService
