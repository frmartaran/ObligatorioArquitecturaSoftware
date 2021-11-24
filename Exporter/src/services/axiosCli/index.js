const axios = require('axios').default

const performGET = async (url) => {
    var apiResponse = new Object()
    apiResponse = await axios.get(url)
    return apiResponse
}

const performPUT = async (url) => {
    var apiResponse = new Object()
    apiResponse = await axios.put(url)
    return apiResponse
}
module.exports = {performGET,performPUT}