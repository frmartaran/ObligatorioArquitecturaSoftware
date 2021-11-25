const CatalogResponse = require('../../../models/catalog/catalogResponse').CatalogResponse
const Observation = require('../../../models/catalog/observation').Observation
//Bulk with buffer?
class MockCli{
    getSensorSingle = async (sensorESN) =>{
        if (sensorESN >= 1 && sensorESN <= 10){
                let response = new CatalogResponse()
                let observation1 = new Observation()
                observation1.obervationName = "temperature"
                observation1.unit = "celcius"
                let observation2 = new Observation()
                observation2.obervationName = "Humidity"
                observation2.unit = "Pascal"
                response.isValid = true
                response.ESN = sensorESN
                response.name = "This is a mock"
                response.location = "America/Montevideo"
                response.properties = [observation1,observation2]
                return response;
        }else if (sensorESN > 10){
                let response
                response.isValid = false
                response.ESN = null
                response.name = null
                response.location = null
                response.properties = null
                return response;        
        }else {
            return new Error("Error getting sensor")
        }
    }
}
module.exports = {MockCli}