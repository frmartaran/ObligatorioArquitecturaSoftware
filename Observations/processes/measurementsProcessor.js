const sensorReadingService = require('../services/sensorReadingService')

measurementsProcessor = (job) => {
    console.log(job.data);
    sensorReadingService.Add(job.data);
    return Promise.resolve();
}

module.exports = measurementsProcessor;