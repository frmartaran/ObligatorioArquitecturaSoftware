const updateSensorCacheservice = require('../services/updateSensorCache')

updateCacheProces = async (job) => {
    switch(job.data.action) {
        case 'UPDATE':
            console.log(job.data.sensor)
            updateSensorCacheservice.updateSensorCache(job.data.sensor)
            break;
        case 'DELETE':
            updateSensorCacheservice.deleteSensorCache(job.data.sensor)
            break;
        default:
          // code block
      }
    return Promise.resolve();
}

module.exports = updateCacheProces;
