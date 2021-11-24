require('dotenv').config()
const {performGET,performPUT} = require('../axiosCli')
const maxRetries = process.env.MAX_RETRIES

const baseURL = `${process.env.BASE_URL}${process.env.LOGIN_PORT}${process.env.LOGIN_PATH}`
const getTimestamp = async (ID)=>{
    const url = `${baseURL}consumeDate/${ID}`
    var retries=0
    var apiResponse = new Object()
    do{
        apiResponse = await performGET(url)
        if (apiResponse.status === 200){
            return apiResponse.data
        }else{
            retries++
        }
    }while(apiResponse.status !== 200&&retries<maxRetries)
    return null
}

const updateTimestamp = async (ID,newTimestamp)=>{
    const url = `${baseURL}${ID}?consumeDate=${newTimestamp}`
    do{
        var retries=0
        var response = await performPUT(url)
        if (response.status === 200){
            return response.data
        }else{
            retries++
        }
    }while(response.status !== 200&&retries<=maxRetries)
    return null
}

module.exports = { getTimestamp,updateTimestamp}
