const config = require('../../../config');
const Queue = require('bull');

const obsQueue = new Queue(
    config.OBSERVATIONS_QUEUE_NAME,
    {redis: 
        {
            port:config.REDIS_PORT,
            host:config.REDIS_HOST 
        } 
    });

const sendData = (data) => {
    obsQueue.add(data,{});
}

module.exports = sendData