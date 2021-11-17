const readingDatabaseService = require('../services/readingDatabaseService');

readingDatabaseProcessor = (job) => {
    if(job.data.action === 'ADD'){
        readingDatabaseService.Add(job.data.data);
    }
    return Promise.resolve();
}

module.exports = readingDatabaseProcessor;