const readingDatabaseService = require('../services/readingDatabaseService');
const queue = require('../queues/queue')

filteredDataProcessor = (job) => {
    queue.pendingValidationQueue.add(job.data)
    readingDatabaseService.Add(job.data);
    return Promise.resolve();
}

module.exports = filteredDataProcessor;