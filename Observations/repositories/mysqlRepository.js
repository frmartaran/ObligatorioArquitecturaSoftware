const Sequelize = require('sequelize');
const SensorReadingModel = require('../model/sensorReading');
const TransformedDataModel = require('../model/transformedData');
const PropertiesModel = require('../model/properties');  
const Config = require('../config/default.json');
const {handleInfraError} = require('../../ErrorHandler/infra_error') //usar en el sync
const db = Config.database;

const sequelize = new Sequelize(db.databaseName, db.username,db.password,{
    host: db.host,
    dialect: db.dialect,
    dialectOptions: db.dialectOptions,
    pool: db.pool
});

const sensorReading = SensorReadingModel(sequelize, Sequelize);
const transformedData = TransformedDataModel(sequelize, Sequelize);
const properties = PropertiesModel(sequelize, Sequelize);

sensorReading.hasMany(transformedData, {
	as: 'transformedData'
});
transformedData.belongsTo(sensorReading, {
	as: 'sensorReading'
});

sensorReading.hasMany(properties, {
	as: 'properties'
});
properties.belongsTo(sensorReading, {
	as: 'sensorReading'
});

module.exports= {
    sensorReading,
    transformedData,
    properties,
	sequelize
}