const sender = require('../../../../services/piplineSender')
const validator = require('../../../../services/validator')
const postData = async (req,res) => {
    const sensorESN = req.query.ESN || req.headers.ESN;
    validator.validateSingleSensor(sensorESN).then((result)=>{
        console.log(`Found result: ${result}`);
        if(result){
            let sensorData=req.body
            // sensorData.properties = result.properties
            sender.sendData(sensorData)
        }
    })
    res.send();
};

module.exports = {postData}