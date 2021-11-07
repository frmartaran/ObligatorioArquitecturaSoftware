const Sequelize = require('sequelize');
const SensorReadingModel = require('../model/sensorReading');
const SensorMeasurementModel = require('../model/sensorMeasurement');
const CatalogUnitModel = require('../model/catalogUnit');

   
const Config = require('../config/default.json');
const db = Config.database;


const sequelize = new Sequelize(db.databaseName, db.username,db.password,{
    host: db.host,
    dialect: db.dialect
});

const sensorReading = SensorReadingModel(sequelize, Sequelize);
const sensorMeasurement = SensorMeasurementModel(sequelize, Sequelize);
const catalogUnit = CatalogUnitModel(sequelize, Sequelize);

sensorReading.hasMany(sensorMeasurement, {
	as: 'sensorMeasurement',
	foreignKey: 'sensorReadingESN'
});
sensorMeasurement.belongsTo(sensorReading, {
	as: 'sensorReading',
	foreignKey: 'sensorReadingESN'
});

sensorReading.hasMany(catalogUnit, {
	as: 'catalogUnit',
	foreignKey: 'sensorReadingESN'
});
catalogUnit.belongsTo(sensorReading, {
	as: 'sensorReading',
	foreignKey: 'sensorReadingESN'
});

sequelize.sync({ force: false}).then(() => {
    console.log('tablas sincronizadas')
})

module.exports= {
    sensorReading,
    sensorMeasurement,
    catalogUnit
}