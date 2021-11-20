const {getData}=require('../../services/consume')
const consume = async (req,res)=>{
    try{
        var response = await getData(req.params.ID)
        if (response.status == 200){
            return response.data
        }
    }catch(err){
        console.log(err)
        return null
    }
    
}

module.exports = {consume}