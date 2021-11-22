const handleApiError = async (err,req,res,next) =>{
    if(err){
        let statusCode = err.statusCode
        let message = err.message
        if(statusCode) res.statusCode = statusCode
        else statusCode = 500
        switch(statusCode){
            case 404:
                message = 'Not found'
                break
            default:
                break    
        }
        res.status(statusCode)
        res.send(message)
    }
}

module.exports={
    handleApiError
}