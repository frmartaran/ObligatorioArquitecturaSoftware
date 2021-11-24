const {performGET}=require('../../../Axios')

const getReport = async (params)=>{
    const url = `${process.env.BASE_URL}${process.env.OBSERVATIONS_PORT}${process.env.OBSERVATIONS_PATH}/averages`
    const queryparams=`?dateFrom=${params.dateFrom}&dateTo=${params.dateTo}&ESN=${params.ESN}&averageType=${params.averageType}&measurementType=${params.measurementType}`
    const response = await performGET(url+queryparams)
    return response
}

module.exports={getReport}