require('dotenv').config();
const express = require('express');
const router = require('./controllers/router');
const sensorReadingService = require('./services/sensorReadingService');
const app = express();
const queue = require('./queues/queue');
const config = require('./config/default.json');

const associateOriginalWithCatalogPropertyFilter = require('./processes/associateOriginalWithCatalogPropertyFilter/associateOriginalWithCatalogPropertyFilter');
const unitTransforamtionFilter = require('./processes/unitTransforamtionFilter/unitTransforamtionFilter');
const filteredDataProcessor = require('./processes/filteredDataProcessor.js');
const readingDatabaseProcessor = require('./processes/readingDatabaseProcessor.js');
const dailyReadingsProcessor = require('./processes/dailyReadingsProcessor.js');

sensorReadingService.Sync();

const port = process.env.PORT;

app.use('/observations', router);

app.listen(
    port,
    () => console.log(`Start listening on port http://localhost:${port}`)
);

queue.measurementsQueue.process(8, associateOriginalWithCatalogPropertyFilter);
queue.originalWithCatalogPropertyQueue.process(8, unitTransforamtionFilter);
queue.filteredDataQueue.process(8, filteredDataProcessor);
queue.incomingReadingDataQueue.process(8, readingDatabaseProcessor);

queue.dailyReadingsQueue.add({}, { repeat: config.dailyProcessorCronExpression });
queue.dailyReadingsQueue.process(dailyReadingsProcessor);

