const queue = require('../queues/queue')

const originalWithCatalogPropertyQueue = queue.originalWithCatalogPropertyQueue

associateOriginalWithCatalogPropertyFilter = (job) => {
    let originalWithCatalogProperty = job.data
    const asociatedDataList = []
    job.data.properties.forEach(properti => {
        job.data.catalogProperties.forEach(catalogProp =>{
            if(properti.Name === catalogProp.Name){
                const asociatedData = {
                    propertyName: properti.Name,
                    originalUnit: properti.unit,
                    finalUnit: catalogProp.unit,
                    value: properti.Value
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