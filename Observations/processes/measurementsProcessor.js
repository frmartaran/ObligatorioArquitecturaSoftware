const sensorReadingService = require('../services/sensorReadingService');
const Queue = require('bull');

const queue = new Queue('incomingReadingData');

measurementsProcessor = (job) => {
    console.log(job.data);
    sensorReadingService.Add(job.data);
    let incomingReadingData = {
        action: 'ADD',
        data: job.data
    }
    queue.add(incomingReadingData);
    return Promise.resolve();
}

module.exports = measurementsProcessor;