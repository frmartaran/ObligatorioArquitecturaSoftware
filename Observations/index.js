require('dotenv').config();
const express = require('express');
const router = require('./controllers/router');
const Repository = require('./repositories/mysqlRepository');
const app = express();
const queue = require('./queues/queue')

const associateOriginalWithCatalogPropertyFilter = require('./processes/associateOriginalWithCatalogPropertyFilter/associateOriginalWithCatalogPropertyFilter')
const unitTransforamtionFilter = require('./processes/unitTransforamtionFilter/unitTransforamtionFilter')

Repository.sequelize.sync({ force: false}).then(() => {
    console.log('tablas sincronizadas')
});

const port = process.env.PORT;

app.use('/observations', router);

app.listen(
    port,
    () => console.log(`Start listening on port http://localhost:${port}`)
);

queue.measurementsQueue.process(8, associateOriginalWithCatalogPropertyFilter);
queue.originalWithCatalogPropertyQueue.process(8, unitTransforamtionFilter);
queue.filteredDataQueue.process(8, __dirname +'/processes/measurementsProcessor.js')

queue.incomingReadingDataQueue.process(8, __dirname +'/processes/readingDatabaseProcessor.js');

queue.dailyReadingsQueue.add({}, { repeat: { cron: '24 11 * * *' } });

queue.dailyReadingsQueue.process(__dirname +'/processes/dailyReadingsProcessor.js');

