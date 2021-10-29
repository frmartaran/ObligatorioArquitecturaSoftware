const axios = require('axios').default
const config = require('../../../config')

//Bulk with buffer?
class AxiosCli{
    validateSensorSingle = async (sensorID) =>{
        const url = config.BASE_URL+`/sensors/${{sensorID}}`
        const response = axios.get(url)
        return response
    }
}
module.exports = {AxiosCli}