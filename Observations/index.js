require('dotenv').config();
const express = require('express');
const router = require('./controllers/router');
const app = express();
const queue = require('./queues/queue');
const config = require('./config/default.json');

const port = process.env.PORT;

app.use('/observations', router);

app.listen(
    port,
    () => console.log(`Start listening on port http://localhost:${port}`)
);

queue.measurementsQueue.process(config.measurements.numberOfProcesses, __dirname + config.measurements.processorLocation);
queue.filteredDataQueue.process(config.filteredData.numberOfProcesses, __dirname + config.filteredData.processorLocation);
queue.originalWithCatalogPropertyQueue.process(config.originalWithCatalogProperty.numberOfProcesses, __dirname + config.originalWithCatalogProperty.processorLocation);
queue.dailyReadingsQueue.process(config.dailyReadingsQueue.numberOfProcesses, __dirname + config.dailyReadingsQueue.processorLocation);

queue.dailyReadingsQueue.getRepeatableJobs().then(repeatableJobs => {
    if (repeatableJobs.length > 0) {
        repeatableJobs.forEach(async job => {
            await queue.dailyReadingsQueue.removeRepeatableByKey(job.key);
        });
    }
    queue.dailyReadingsQueue.add({}, { repeat: { "cron": config['dailyProcessorCronExpression:'] } });
});