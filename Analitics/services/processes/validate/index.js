const {sendEmail}=require('../../../../Utils/email')
const Config = require('../../../config/default.json');

validate = (job) => {
    const properties = job.data.transformedData
    const esn = job.data.ESN
    for (let index = 0; index < properties.length; index++) {
        const property = properties[index];
        if(property.min > property.value ||property.max < property.value){
            var params = {
                from: Config.microserviceName,
                subject: Config.alarmEmailSubject,
                text: Config.alarmEmailText  + `(${esn}, ${property.propertyName})`
            }
            sendEmail(params)
        }   
    }
    
    return Promise.resolve();
}

module.exports = validate;