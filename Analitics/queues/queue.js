const Config = require('../config/default.json')
const Queue = require('bull');

const validationDataQueue = new Queue(
    Config.validationData.name,
    {redis: 
        {
            port: Config.validationData.port,
            host: Config.validationData.host 
        } 
    });

module.exports = {
    validationDataQueue
}