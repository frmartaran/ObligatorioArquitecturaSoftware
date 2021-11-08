const readingDatabaseRepository = require('../services/readingDatabaseService');

readingDatabaseProcessor = (job) => {
    if(job.data.action === 'ADD'){
        readingDatabaseRepository.Add(job.data.data);
    }
    return Promise.resolve();
}

module.exports = readingDatabaseProcessor;