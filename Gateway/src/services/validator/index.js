const tmp = require('../apiCli')
const client = tmp.getClient()
const {
    getSensor,
    refresh,
    checkCache
} = require('../../data_access')

const validateSingleSensor = async (sensorESN) =>{
    try{
        let result
        let useCache = checkCache()
        if(useCache){
            result = await getSensor(sensorESN)
            if(result){
                let parsed = JSON.parse(result)
                refresh(sensorESN,parsed)
                return (parsed)
            }  
        }
        console.log(`Cache: ${result}`)
        if(!result){
            apiResponse = await client.getSensorSingle(sensorESN);
            if(apiResponse.status == 200){
                let data = apiResponse.data
                console.log(`API: ${data}`)        
                refresh(sensorESN,data)
                result = data;
            }else{
                console.log(`API: ${apiResponse}`)        
                result = null;
            }  
        }
        console.log(`Final: ${result}`)
        return new Promise((resv,rej)=>{resv(result)})
    }
    catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {validateSingleSensor}