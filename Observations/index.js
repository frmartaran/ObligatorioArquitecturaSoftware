require('dotenv').config();
const express = require('express');
const router = require('./controllers/router');
const app = express();
const queue = require('./queues/queue')

const associateOriginalWithCatalogPropertyFilter = require('./processes/associateOriginalWithCatalogPropertyFilter/associateOriginalWithCatalogPropertyFilter')
const unitTransforamtionFilter = require('./processes/unitTransforamtionFilter/unitTransforamtionFilter')

const port = process.env.PORT;

//const incomingReadingDataQueue = new Queue('incomingReadingData');

app.use('/observations', router);

app.listen(
    port,
    () => console.log(`Start listening on port http://localhost:${port}`)
);

queue.measurementsQueue.process(8, associateOriginalWithCatalogPropertyFilter);
queue.originalWithCatalogPropertyQueue.process(8, unitTransforamtionFilter);