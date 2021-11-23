const Repository = require('./mysqlRepository')
const { handleInfraError } = require('../../ErrorHandler/infra_error')
const prefixMethod = "SensorReadingRepository"

const SensorReadingRepository = {
    Sync: async () => {
        Repository.sequelize.sync({ force: false});
    },
    Add: async (data) => {
        try{
            var query = Repository.sensorReading.create(data, {
                include: [
                    {
                        association: Repository.sensorReading.associations.properties,
                    },
                    {
                        association: Repository.sensorReading.associations.transformedData,
                    },
                ]
            });
            var newSensorReading = await query;
            return newSensorReading;
        
        }catch(err){
            handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}: Get`, message: err.message,payload: `DateFrom: ${dateFrom}`})
        }
    },
}
module.exports = SensorReadingRepository