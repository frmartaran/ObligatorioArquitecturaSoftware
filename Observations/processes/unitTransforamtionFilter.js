const Queue = require('bull');
const Transf = require('./transformations.json')
var fs = require('fs');

//const queue = new Queue('unitTransforamtion');

unitTransforamtionFilter = (job) => {

    const transformedDataList = []
    let transformation = job.data
    job.data.asociatedData.forEach(data => {

        var Transf = JSON.parse(fs.readFileSync('./processes/transformations.json', 'utf8'));
        const originalUnit = data.originalUnit
        const finalUnit = data.finalUnit
        const tag = originalUnit+"-"+finalUnit
        const tr = Transf[tag]
        
        let value = data.value
        let result = eval(tr)

        const transformedData = {
            propertyName: data.propertyName,
            unit: data.finalUnit,
            value: result
        }
        transformedDataList.push(transformedData)
    })
    transformation.transformedData = transformedDataList
    console.log(transformation)
    //queue.add(incomingReadingData);
    return Promise.resolve();
}

module.exports = unitTransforamtionFilter;