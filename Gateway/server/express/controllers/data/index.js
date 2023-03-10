const sender = require('../../../../services/piplineSender')
const validator = require('../../../../services/validator')
const postData = async (req,res) => {
    const sensorESN = req.query.ESN || req.headers.ESN;
    validator.validateSingleSensor(sensorESN)
    .then((result)=>{
        if(result){
            let sensorData=req.body
            sensorData.catalogProperties = result.properties
            let incomingDate = new Date()
            sensorData.incomingDate = incomingDate
            sender.sendData(sensorData)
        }
    })
    res.status(201)
    res.send();
};

module.exports = {postData}