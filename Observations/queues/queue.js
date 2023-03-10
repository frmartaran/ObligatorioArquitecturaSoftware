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

const filteredDataQueue = new Queue(
    config.filteredData.name,
    {redis: 
        {
            port:config.filteredData.port,
            host:config.filteredData.host 
        } 
    });

const dailyReadingsQueue = new Queue(
    config.dailyReadingsQueue.name,
    {redis: 
        {
            port:config.dailyReadingsQueue.port,
            host:config.dailyReadingsQueue.host 
        } 
    });

const pendingValidationQueue = new Queue(
    config.pendingValidationQueue.name,
    {redis: 
        {
            port:config.pendingValidationQueue.port,
            host:config.pendingValidationQueue.host 
        } 
    });

module.exports = {
    originalWithCatalogPropertyQueue,
    measurementsQueue,
    filteredDataQueue,
    dailyReadingsQueue,
    pendingValidationQueue
}