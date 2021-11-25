const {log} = require('../logger')
const handleInfraError = async (err)=>{
    if (err){
        let params = err.payload
        if(params==null||params==undefined||params=="") params = "N/A"  
        var date = new Date()
        date = date.getTime()
        const path = __dirname
        const filename = 'errors'
        const msg = `\nERROR: [APP:${err.app}] [Method: ${err.method}] [ERROR: ${err.message}] [Payload: ${params}] [DateTimestamp: ${date}]`
        log(msg,path,filename)
    }
}

module.exports= {handleInfraError}