//Load config
require('dotenv').config();
const queue = require('./src/queues/queue');
const factory = require('./src/server/factory');
const config = require('./src/config/envs/default.json');

console.log(process.env.PORT)

const serverKey = process.env.SERVER.toString()
if(serverKey){
    const server = factory.getServer(process.env.SERVER)
    server.startServer(process.env.PORT)
}else{
    console.log('no serverKey in env')
}

queue.updateSensor.process(config.updateSensor.numberOfProcesses, __dirname + config.updateSensor.processorLocation);