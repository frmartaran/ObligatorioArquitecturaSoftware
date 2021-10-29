const config = require('../../../config')

//Bulk with buffer?
class MockCli{
    validateSensorSingle = async (sensorID) =>{
        if (sensorID == 1){
                return true;
        }else if (sensorID > 1){
                return false;            
        }else {
            return new Error("Error getting sensor")
        }
    }
}
module.exports = {MockCli}