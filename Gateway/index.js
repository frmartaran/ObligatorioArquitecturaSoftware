//Load config
require('dotenv').config()
const queue = require('./src/queues/queue')
const factory = require('./src/server/factory')

console.log(process.env.PORT)

const updateCacheProces = require('./src/processes/updateCacheProces')

const serverKey = process.env.SERVER.toString()
if(serverKey){
    const server = factory.getServer(process.env.SERVER)
    server.startServer(process.env.PORT)
}else{
    console.log('no serverKey in env')
}

queue.updateSensor.process(8, updateCacheProces);