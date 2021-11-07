const Sequelize = require('sequelize')
const SensorModel = require('../model/sensor')
const ObsModel = require('../model/properties')

   
const Config = require('../config/config.json');
const db = Config.database


const sequelize = new Sequelize(db.databaseName, db.username,db.password,{
    host: db.host,
    dialect: db.dialect
})

const Sensor = SensorModel(sequelize, Sequelize)
const Properties = ObsModel(sequelize, Sequelize)

Sensor.hasMany(Properties) 

sequelize.sync({ force: false}).then(() => {
    console.log('tablas sincronizadas')
})

module.exports= {
    Sensor,
    Properties
}

// {
// 	ESN:”fruta”,
// 	Nombre:”algo”,
// 	location:”jkdsfjklsd”
// 	date:”TIMESTAMP”
// 	catalogProperties:[{
// 		"observationName":”temperatura”,
// 		"unit":”C”,
// 	},
//     {
//     		"observationName":”Humidity”,
//     		"unit":”HP”,
//     }],
//     sensorProperties:{
//     		Name: "temperature"
//             Value: 26.09,
//     		unit:”F”
//             },
//            {
//     		Name: "humidity"
//     Value: 12.09,
//     		unit:”HP”
//            }
//     	}
//     }
