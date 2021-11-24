const queue = require('../../queues/queue')

const originalWithCatalogPropertyQueue = queue.originalWithCatalogPropertyQueue

associateOriginalWithCatalogPropertyFilter = (job) => {
    let originalWithCatalogProperty = job.data
    const asociatedDataList = []
    job.data.properties.forEach(property => {
        job.data.catalogProperties.forEach(catalogProp =>{
            if(property.Name === catalogProp.Name){
                const asociatedData = {
                    propertyName: property.Name,
                    originalUnit: property.unit,
                    finalUnit: catalogProp.unit,
                    value: property.Value,
                    min: catalogProp.sensorProperty.minUnitValue,
                    max: catalogProp.sensorProperty.maxUnitValue,
                }
                asociatedDataList.push(asociatedData)
            }
        })
    })
    originalWithCatalogProperty.asociatedData = asociatedDataList
    originalWithCatalogPropertyQueue.add(originalWithCatalogProperty);
    return Promise.resolve();
}

module.exports = associateOriginalWithCatalogPropertyFilter;