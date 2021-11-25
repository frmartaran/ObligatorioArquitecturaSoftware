const tmp = require('../apiCli')
const {
    getSensor,
    refresh,
    checkCache,
    deleteKey
} = require('../../data_access')

const updateSensorCache = async (sensor) =>{
    try{
        let result
        let useCache = checkCache()
        if(useCache){
            console.log(sensor.ESN)
            result = await getSensor(sensor.ESN)
            console.log(result)
            if(result){
                refresh(sensor.ESN,sensor)
                return (sensor)
            }  
        }
        console.log(`Cache orginal sensor: ${result}`)
        console.log(`Cache actual sensor: ${sensor}`)

        return new Promise((resv,rej)=>{resv(result)})
    }
    catch(err){
        console.log(err);
        return null;
    }
}

const deleteSensorCache = async (sensor) =>{
    try{
        let result
        let useCache = checkCache()
        if(useCache){
            result = await getSensor(sensor.ESN)
                if(result){
                    deleteKey(sensor.ESN)
                    return (sensor)
                }  
        }
        console.log(`Cache orginal sensor: ${result}`)
        console.log(`Cache actual sensor: ${sensor}`)
        
        return new Promise((resv,rej)=>{resv(result)})
    }
    catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {updateSensorCache,deleteSensorCache}