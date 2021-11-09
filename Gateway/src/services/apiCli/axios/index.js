const axios = require('axios').default
const config = require('../../../config')

//Bulk with buffer?
class AxiosCli{
    getSensorSingle = async (sensorID) =>{
        const url = config.BASE_URL+`/sensors/${sensorID}`
        try{
            const response = await axios.get(url)
            console.log(`Axios response: ${response}`)
            return response
        }
        catch(err){
            console.log(err.message)
            return null
        }
    }
}
module.exports = {AxiosCli}