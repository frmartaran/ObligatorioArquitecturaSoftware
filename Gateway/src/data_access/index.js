const config = require('../config')
const redis = require('redis')
const client = redis.createClient(config.REDIS_PORT)
const TTL = 3600

function getSensor(sensorESN) {
    try{
        return new Promise((resv,rej) =>{
            client.get(sensorESN,(err,reply)=>{resv(reply)})
        })
    }catch(err){
        console.log(err)
        return null
    }
}

const refresh = async (sensorESN,data) =>{
    client.setex(sensorESN,TTL,data);
}

module.exports = {getSensor,refresh}