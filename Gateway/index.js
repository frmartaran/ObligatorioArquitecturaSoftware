//Load config
require('dotenv').config()
const factory = require('./src/server/factory')
console.log(process.env.PORT)

const serverKey = process.env.SERVER.toString()
if(serverKey){
    const server = factory.getServer(process.env.SERVER)
    server.startServer(process.env.PORT)
}else{
    console.log('no serverKey in env')
}