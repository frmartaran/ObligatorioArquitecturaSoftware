const {sendEmail}=require('../../email')

validate = (job) => {
    const properties = job.data.transformedData
    const esn = job.data.ESN
    for (let index = 0; index < properties.length; index++) {
        const property = properties[index];
        if(property.min > property.value ||property.max < property.value){
            var params = {
                name: 'Test',
                email:'d.baccino@outlook.com',
                sensor_ESN: esn,
                propertyParam: property.propertyName
            }
            sendEmail(params)
        }   
    }
    
    return Promise.resolve();
}

module.exports = validate;