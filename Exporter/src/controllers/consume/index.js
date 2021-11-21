const {getData}=require('../../services/consume')
const consume = async (req,res)=>{
    try{
        var response = await getData(req.params.ID)
        res.send(response)
    }catch(err){
        console.log(err)
        res.status(500).send(err.message)
    }
    
}

module.exports = {consume}