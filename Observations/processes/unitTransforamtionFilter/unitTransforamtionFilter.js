let fs = require('fs');

const queue = require('../../queues/queue');

unitTransforamtionFilter = (job) => {
    const transformedDataList = []
    let transformation = {
        ESN: job.data.ESN,
        Nombre: job.data.name,
        location: job.data.location,
        date: job.data.date,
        properties: job.data.asociatedData
    }
    job.data.asociatedData.forEach(data => {
        let Transf = JSON.parse(fs.readFileSync('./processes/unitTransforamtionFilter/transformations.json', 'utf8'));
        const originalUnit = data.originalUnit
        const finalUnit = data.finalUnit
        const tag = originalUnit+"-"+finalUnit
        const tr = Transf[tag]
        
        let result = eval(tr)

        if(result){
            const transformedData = {
                propertyName: data.propertyName,
                unit: data.finalUnit,
                value: result,
                min: data.min,
                max: data.max
            }
            transformedDataList.push(transformedData)
        }
    })
    transformation.transformedData = transformedDataList;
    if(transformedDataList.length) {
        queue.filteredDataQueue.add(transformation);
    };
    return Promise.resolve();
}

module.exports = unitTransforamtionFilter;