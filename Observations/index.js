require('dotenv').config();
const express = require('express');
const router = require('./controllers/router');
const sensorReadingService = require('./services/sensorReadingService');
const app = express();
const queue = require('./queues/queue');
const config = require('./config/default.json');

(async () => {
    await sensorReadingService.Sync();
})();

const port = process.env.PORT;

app.use('/observations', router);

app.listen(
    port,
    () => console.log(`Start listening on port http://localhost:${port}`)
);

queue.measurementsQueue.process(8, __dirname + '/processes/associateOriginalWithCatalogPropertyFilter/associateOriginalWithCatalogPropertyFilter.js');
queue.originalWithCatalogPropertyQueue.process(8, __dirname + '/processes/unitTransforamtionFilter/unitTransforamtionFilter.js');
queue.filteredDataQueue.process(8, __dirname + '/processes/filteredDataProcessor.js');
queue.incomingReadingDataQueue.process(8, __dirname + '/processes/readingDatabaseProcessor.js');

queue.dailyReadingsQueue.add({}, { repeat: config.dailyProcessorCronExpression });
queue.dailyReadingsQueue.process(__dirname + '/processes/dailyReadingsProcessor.js');