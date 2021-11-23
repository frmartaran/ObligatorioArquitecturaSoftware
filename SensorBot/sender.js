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

/*const getPropertiesBySensor = async (ESN) => {

    const options = {
        url: 'http://localhost:3000/catalog/sensor/'+ESN,
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Accept-Charset': 'utf-8',
            'User-Agent': 'my-reddit-client'
        }
    };
    let algo
    let result = await request(options, await function(err, res, body) {
        algo = JSON.parse(body);
        console.log("la concha de la lora")
        console.log(algo);
    })
    console.log(algo);
    return  result.toJSON()
  }*/

module.exports = {sender}