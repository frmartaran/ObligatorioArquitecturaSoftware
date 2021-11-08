const Repository = require('./mongoRepository')

const readingDatabaseRepository = {
    Add: async (data) => {
        const reading = new Repository.Reading(data);
        return reading.save();
    },
}
module.exports = readingDatabaseRepository