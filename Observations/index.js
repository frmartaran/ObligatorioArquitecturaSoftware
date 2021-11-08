require('dotenv').config();
const express = require('express');
const router = require('./controllers/router');
const Queue = require('bull');
const app = express();

const port = process.env.PORT;
const measurementsQueue = new Queue('measurements');
const incomingReadingDataQueue = new Queue('incomingReadingData');

app.use('/observations', router);

app.listen(
    port,
    () => console.log(`Start listening on port http://localhost:${port}`)
);

measurementsQueue.process(8, __dirname +'/processes/measurementsProcessor.js');
incomingReadingDataQueue.process(8, __dirname +'/processes/readingDatabaseProcessor.js');