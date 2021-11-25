var request = require('request');

const sender = async (json,res)=>{
    console.log("sed")
    try{
        var uri = 'http://localhost:8000/data?ESN='+json.ESN
        var options = {
            uri: uri,
            method: 'POST',
            json: json
        };        
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 201) {
                console.log("sensor ",json.ESN," sended ") 
            }
        });
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
    
}

module.exports = {sender}