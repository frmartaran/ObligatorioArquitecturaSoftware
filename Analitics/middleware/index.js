function validateParams(req,res,next){
    const averageType =req.query.averageType
    if(isNaN(req.query.dateFrom)||isNaN(req.query.dateTo)){
        res.send('some date is not a number').status(400)
    }else if(!equalsIgnoreCase('MONTHLY',averageType)&&
    !equalsIgnoreCase('YEARLY',averageType)&&equalsIgnoreCase('DAILY',averageType)){
        res.send(`type ${averageType} is not supported`).status(400)
    }else if(!req.query.ESN){
        res.send('ESN can not be null').status(400)
    }else if(!req.query.measurementType){
        res.send('measurementType can not be null').status(400)
    }else{
        next()
    }
}

function equalsIgnoreCase(value,toBeEqual){
    return toBeEqual.toUpperCase() == value.toUpperCase()
}

module.exports = {validateParams}