const sensorReadingService = require('../services/sensorReadingService');
const Queue = require('bull');

const queue = new Queue('incomingReadingData');
const queue2 = require('../queues/queue')


filteredDataProcessor = (job) => {
    queue2.pendingValidationQueue.add(job.data)
    sensorReadingService.Add(job.data);
    let incomingReadingData = {
        action: 'ADD',
        data: job.data
    }
    queue.add(incomingReadingData);
    return Promise.resolve();
}

module.exports = filteredDataProcessor;