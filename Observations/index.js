require('dotenv').config();
const express = require('express');
const router = require('./controllers/router');
const Queue = require('bull');
const app = express();

const associateOriginalWithCatalogPropertyFilter = require('./processes/associateOriginalWithCatalogPropertyFilter')
const unitTransforamtionFilter = require('./processes/unitTransforamtionFilter')

const port = process.env.PORT;
const measurementsQueue = new Queue('measurements');
//const incomingReadingDataQueue = new Queue('incomingReadingData');
const originalWithCatalogPropertyQueue = new Queue('originalWithCatalogProperty');


app.use('/observations', router);

app.listen(
    port,
    () => console.log(`Start listening on port http://localhost:${port}`)
);

//measurementsQueue.process(8, __dirname +'/processes/measurementsProcessor.js');
measurementsQueue.process(8, associateOriginalWithCatalogPropertyFilter);
originalWithCatalogPropertyQueue.process(8, unitTransforamtionFilter);
