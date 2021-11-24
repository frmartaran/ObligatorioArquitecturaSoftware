require('dotenv').config();
const express = require('express');
const router = require('./controllers/router');
const app = express();
const queue = require('./queues/queue');
const config = require('./config/default.json');
const {handleApiError}=require('../ErrorHandler/api_errors')
const port = process.env.PORT;

app.use('/observations', router);
app.use(handleApiError)

app.listen(
    port,
    () => console.log(`Start listening on port http://localhost:${port}`)
);

queue.measurementsQueue.process(4, __dirname + '/processes/associateOriginalWithCatalogPropertyFilter/associateOriginalWithCatalogPropertyFilter.js');
queue.originalWithCatalogPropertyQueue.process(4, __dirname + '/processes/unitTransforamtionFilter/unitTransforamtionFilter.js');
queue.filteredDataQueue.process(4, __dirname + '/processes/filteredDataProcessor.js');
queue.dailyReadingsQueue.process(__dirname + '/processes/dailyReadingsProcessor.js');

queue.dailyReadingsQueue.getRepeatableJobs().then(repeatableJobs => {
    if (repeatableJobs.length > 0) {
        repeatableJobs.forEach(async job => {
            await queue.dailyReadingsQueue.removeRepeatableByKey(job.key);
        });
    }
    queue.dailyReadingsQueue.add({}, { repeat: { "cron": config['dailyProcessorCronExpression:'] } });
});