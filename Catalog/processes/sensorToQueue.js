const queue = require('../queues/queue')

sendToQueue = async (send) => {
    queue.updateSensor.add(send);
    return Promise.resolve();
}

module.exports = sendToQueue;
