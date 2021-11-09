const Sequelize = require('sequelize')
const UserModel = require('../models/user')
   
const Config = require('../config/config.json')
const db = Config.database


const sequelize = new Sequelize(db.databaseName, db.username,db.password,{
    host: db.host,
    dialect: db.dialect
})

const User = UserModel(sequelize, Sequelize)

sequelize.sync({ force: false}).then(() => {
    console.log('tablas sincronizadas')
})

module.exports= {
    User
}