const {getReport}=require('../../services/reports')

const generateReport = async (req,res,next)=>{
    try{
        const params = {
            dateFrom:req.query.dateFrom,
            dateTo:req.query.dateTo,
            ESN:req.query.ESN,
            averageType:req.query.averageType,
            measurementType:req.query.measurementType
        }
        const result = await getReport(params)
        req.event='GET /reports'
        req.data=JSON.stringify(params)
        res.send(result.data)
        next()
    }catch(err){
        next(err)
    }
}

module.exports={generateReport}