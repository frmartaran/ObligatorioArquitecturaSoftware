const config = require('../config')
const redis = require('redis')
const promisify = require('util.promisify')
const client = redis.createClient(config.REDIS_PORT)
client.on('connect',()=>{console.log('connected to redis')})
client.on('error',(err)=>{console.log(`Error ${err.message}`)})
const TTL = 3600

function checkCache(){
    try{        
        return client.ping()
    }
    catch(err){
        return false
    }
}

const getSensor = async (sensorESN) => {
    try{
        const get = promisify(client.get).bind(client)
        const value = await get(sensorESN)
        return value
    }catch(err){
        console.log(err)
        return null
    }
}

const refresh = async (sensorESN,data) =>{
    const json = JSON.stringify(data)
    client.setex(sensorESN,TTL,json);
}

const deleteKey = async (sensorESN) =>{
    client.DEL(sensorESN);
}

module.exports = {getSensor,refresh,checkCache,deleteKey}