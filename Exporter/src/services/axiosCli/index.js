const axios = require('axios').default

const performGET = async (url) => {
    var apiResponse = new Object()
    try{
        apiResponse = await axios.get(url)
    }catch(err){
        apiResponse.status=500
        apiResponse.message = 'cant make request'
    }
    finally{
        return apiResponse
    }
}

const performPUT = async (url) => {
    var apiResponse = new Object()
    try{
        apiResponse = await axios.put(url)
    }catch(err){
        apiResponse.status=500
        apiResponse.message = 'cant make request'
    }
    finally{
        return apiResponse
    }
}
module.exports = {performGET,performPUT}