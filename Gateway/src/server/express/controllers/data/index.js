const sender = require('../../../../services/piplineSender')
const tmp = require('../../../../services/apiCli')
const client = tmp.getClient()
const postData = async (req,res,next) => {
    const sensorID = 1;
    client.validateSensorSingle(sensorID)
    .then(
            (result)=>{
                if(result){
                    sender.sendData(req.body)
                }
            }
        )
    .catch(
        (err)=>{
            console.log(err)
            next(err)
        }
    )
    res.send();
};

module.exports = {postData}