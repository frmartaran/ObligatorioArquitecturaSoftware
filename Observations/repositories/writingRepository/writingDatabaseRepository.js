const Repository = require('./../mongoRepository');
const { handleInfraError } = require('../../../ErrorHandler/infra_error');
const prefixMethod = "mongoDB";

const writingDatabaseRepository = {
    Add: async (data) => {
        try {
            const reading = new Repository.Reading(data);
            return reading.save();
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add`, message: err.message, payload: JSON.stringify(data) })
            throw err;
        }
    },
    AddManyReadings: async (data) => {
        const reading = Repository.Reading.insertMany(data);
        return reading;
    },
    AddDailyReadings: async (data) => {
        try {
            const reading = Repository.DailyReading.insertMany(data);
            return reading;
        } catch (err) {
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Add Daily Readings`, message: err.message, payload: JSON.stringify(data) })
            throw err;
        }
    },
}
module.exports = writingDatabaseRepository