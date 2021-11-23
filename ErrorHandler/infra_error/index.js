const fs = require('fs')

const handleInfraError = async (err)=>{
    if (err){
        let params = err.payload
        if(params==null||params==undefined||params=="") params = "N/A"  
        var date = new Date()
        date = date.getTime()
        const msg = `\n[APP:${err.app}] [Method: ${err.method}] [ERROR: ${err.message}] [Payload: ${params}] [DateTimestamp: ${date}]`
        const path =__dirname+'/errors.txt'
        fs.writeFile(path,msg, { flag: 'a+' }, err => {if(err) console.log(err.message);else console.log(`Write file in path: ${path}`)})
    }
}

module.exports= {handleInfraError}