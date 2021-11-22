const Sequelize = require('sequelize')
const SensorModel = require('../models/sensor')
const PropertyModel = require('../models/property')
   
const Config = require('../config/config.json')
const db = Config.database


const sequelize = new Sequelize(db.databaseName, db.username,db.password,{
    host: db.host,
    dialect: db.dialect
})

const Sensor = SensorModel(sequelize, Sequelize)
const Property = PropertyModel(sequelize, Sequelize)
const SensorProperty = sequelize.define('sensorProperty', {
    sensorESN:{
        type: Sequelize.STRING(16),
        references: {
            model: Sensor, 
            key: 'ESN'
          }
    },
    propertyName: {
        type: Sequelize.STRING(16),
        references: {
          model: Property, 
          key: 'Name'
        }
      },
      minUnitValue: Sequelize.INTEGER,
      maxUnitValue: Sequelize.INTEGER
})

Sensor.belongsToMany(Property, { through: SensorProperty })
Property.belongsToMany(Sensor, { through: SensorProperty })

sequelize.sync({ force: false}).then(() => {
    console.log('tablas sincronizadas')
})

module.exports= {
    Sensor,
    Property,
    SensorProperty
}