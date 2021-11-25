const Config = require('../config/envs/default.json');
const Queue = require('bull');

const updateSensor = new Queue(
    Config.updateSensor.name,
    {redis: 
        {
            port: Config.updateSensor.port,
            host: Config.updateSensor.host 
        } 
    });

const obsQueue = new Queue(
    Config.OBSERVATIONS_QUEUE_NAME,
    {redis: 
        {
            port:Config.REDIS_PORT,
            host:Config.REDIS_HOST 
        } 
    });

const sendData = (data) => {
    obsQueue.add(data,{});
}

module.exports = {
    updateSensor,
    sendData
}