const {performGET} = require('../axiosCli')
const {getTimestamp,updateTimestamp} = require('../timestamp')

const getData = async (ID) =>{
    const timestamp = await getTimestamp(ID)
    const url = `${process.env.BASE_URL}${process.env.OBSERVATIONS_PORT}${process.env.OBSERVATIONS_PATH}/readings?dateFrom=${timestamp}`
    const response = await performGET(url)
    if(response.status === 200){
        updateTimestamp(response.data.newConsumeDate,ID)
        return response.data.values
    }
    else{
        console.log(response.status)
        return response.message
    }
}

module.exports = {getData}