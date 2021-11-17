const Repository = require('./mongoRepository')

const readingDatabaseRepository = {
    Add: async (data) => {
        const reading = new Repository.Reading(data);
        return reading.save();
    },
    Get: (dateFrom) => {
        let query = Repository.Reading.find({
            "date": {
                "$gte": dateFrom
            }
        });
        return query;
    },
}
module.exports = readingDatabaseRepository