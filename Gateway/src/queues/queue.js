const Config = require('../config/envs/default.json')
const Queue = require('bull');

const updateSensor = new Queue(
    Config.updateSensor.name,
    {redis: 
        {
            port: Config.updateSensor.port,
            host: Config.updateSensor.host 
        } 
    });

module.exports = {
    updateSensor
}