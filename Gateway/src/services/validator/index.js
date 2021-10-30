const tmp = require('../apiCli')
const client = tmp.getClient()

const cache = require('../../data_access')

function validateSingleSensor(sensorESN){
    try{
        console.log('Awaiting Cache');
        let result = cache.getSensor(sensorESN)
        .then((cacheResult)=>
        {
            console.log(`Cache result: ${cacheResult}`)
            if (cacheResult){
                cache.refresh(sensorESN,cacheResult);
                return cacheResult;
            }
            else{
                console.log('Fallback to api');
                let apiResult = client.getSensorSingle(sensorESN)
                .then((apiResponse)=>{
                    if(apiResponse){
                        cache.refresh(sensorESN,apiResponse)
                        console.log(`Found in api. Result: ${apiResponse}`);
                        return apiResponse;
                    }else{
                        return null;
                    }
                })
                return apiResult;
            }
        });
        console.log(`Result pre return ${result}`)
        return new Promise((resv,rej)=>{resv(result)})
    }
    catch(err){
        console.log(err);
        return null;
    }
}

module.exports = {validateSingleSensor}