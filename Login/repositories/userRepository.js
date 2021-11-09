const Repository = require('./repository')

const UserRepository = {

    findById: async (id) => {
        var query = Repository.User.findOne({ where: { name: id } });
        let user = await query;
        return user;
    },
}
module.exports = UserRepository
