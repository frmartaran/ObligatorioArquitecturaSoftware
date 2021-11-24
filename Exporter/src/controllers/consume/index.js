const {getData}=require('../../services/consume')
const consume = async (req,res,next)=>{
    try{
        req.event = '/consume/:ID'
        req.data = `UserID: ${req.params.ID}`
        var response = await getData(req.params.ID)
        res.send(response)
        next()
    }catch(err){
        next(err)
    }
}

module.exports = {consume}