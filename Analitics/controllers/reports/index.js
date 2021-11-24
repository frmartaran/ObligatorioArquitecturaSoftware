const {getReport}=require('../../services/reports')

const generateReport = async (req,res,next)=>{
    try{
        const params = {
            dateFrom:req.query.dateFrom,
            dateTo:req.query.dateTo,
            ESN:req.query.dateESN,
            averageType:req.query.averageType,
            measurementType:req.query.measurementType
        }
        const result = await getReport(params)
        req.event='GET /reports'
        req.data=JSON.stringify(params)
        res.send(result)
        next()
    }catch(err){
        next(err)
    }
}

module.exports={generateReport}