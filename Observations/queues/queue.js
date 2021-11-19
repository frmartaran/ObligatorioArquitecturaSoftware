const config = require('../config/default.json');
const Queue = require('bull');

const originalWithCatalogPropertyQueue = new Queue(
    config.originalWithCatalogProperty.name,
    {redis: 
        {
            port:config.originalWithCatalogProperty.port,
            host:config.originalWithCatalogProperty.host 
        } 
    });

const measurementsQueue = new Queue(
    config.measurements.name,
    {redis: 
        {
            port:config.measurements.port,
            host:config.measurements.host 
        } 
    });

module.exports = {
    originalWithCatalogPropertyQueue,
    measurementsQueue
}