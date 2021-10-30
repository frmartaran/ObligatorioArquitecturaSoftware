const tmp = require('../apiCli')
const client = tmp.getClient()

const cache = require('../../data_access')

function validateSingleSensor(sensorESN){
    try{
        let result = cache.getSensor(sensorESN)
        .then((cacheResult)=>
        {
            if (cacheResult){
                cache.refresh(sensorESN,cacheResult);
                return cacheResult;
            }
            else{
                let apiResult = client.getSensorSingle(sensorESN)
                .then((apiResponse)=>{
                    if(apiResponse){
                        cache.refresh(sensorESN,apiResponse)
                        return apiResponse;
                    }else{
                        return null;
                    }
                })
                return apiResult;
            }
        });
        return new Promise((resv,rej)=>{resv(result)})
    }
    catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {validateSingleSensor}