let fs = require('fs');

const queue = require('../../queues/queue');
const Config = require('../../config/default.json');

unitTransforamtionFilter = async (job) => {
    //Este valor es usado por la expresion eval
    let value = 0;
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
        const originalUnit = data.originalUnit;
        const finalUnit = data.finalUnit;
        const tag = originalUnit+"-"+finalUnit;
        const tr = Transf[tag];

        let result = eval(tr);

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
        await queue.filteredDataQueue.add(transformation, Config.defaultJobOptions);
    };
    return Promise.resolve();
}

module.exports = unitTransforamtionFilter;