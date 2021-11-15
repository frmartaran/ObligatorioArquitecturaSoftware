const retriveHealthcheck= async (req,res)=>{
    res.status(200)
    res.send(`It's alive!`)
}

module.exports = {retriveHealthcheck}