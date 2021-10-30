const config = require('../../../config')

//Bulk with buffer?
class MockCli{
    getSensorSingle = async (sensorID) =>{
        if (sensorID >= 1 && sensorID <= 10){
                return true;
        }else if (sensorID > 10){
                return false;            
        }else {
            return new Error("Error getting sensor")
        }
    }
}
module.exports = {MockCli}