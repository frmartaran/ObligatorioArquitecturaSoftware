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
	as: 'sensorMeasurement'
});
sensorMeasurement.belongsTo(sensorReading, {
	as: 'sensorReading'
});

sensorReading.hasMany(catalogUnit, {
	as: 'catalogUnit'
});
catalogUnit.belongsTo(sensorReading, {
	as: 'sensorReading'
});

module.exports= {
    sensorReading,
    sensorMeasurement,
    catalogUnit,
	sequelize
}