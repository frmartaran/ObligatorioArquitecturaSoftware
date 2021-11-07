require('dotenv').config();
const express = require('express');
const router = require('./controllers/router');
const Queue = require('bull');
const app = express();

const port = process.env.PORT;
const measurementsQueue = new Queue('measurements');

app.use('/observations', router);

app.listen(
    port,
    () => console.log(`Start listening on port http://localhost:${port}`)
);

measurementsQueue.process(16, __dirname +'/processes/measurementsProcessor.js');