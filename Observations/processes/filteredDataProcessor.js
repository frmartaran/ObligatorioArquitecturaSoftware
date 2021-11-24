const readingDatabaseService = require('../services/readingDatabaseService');
const queue = require('../queues/queue');
const { handleInfraError } = require('../../ErrorHandler/infra_error');

const prefixMethod = "filteredDataProcessor";

filteredDataProcessor = async (job) => {
    try{
        queue.pendingValidationQueue.add(job.data)
        let dateFrom = new Date(job.data.incomingDate);
        let dateTo = new Date()
        let differenceInTime = dateTo.getTime() - dateFrom.getTime();
        job.data.processTime = differenceInTime
        await readingDatabaseService.Add(job.data);
        return Promise.resolve();
    }catch (err){
        handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}`, message: err, payload: JSON.stringify(job.data) })
        return Promise.reject(err);
    }
}

module.exports = filteredDataProcessor;