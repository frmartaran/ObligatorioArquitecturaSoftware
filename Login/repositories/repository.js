const Sequelize = require('sequelize')
const UserModel = require('../models/user')
const ExporterUserModel = require('../models/exporter_user')
const { handleInfraError } = require('../../ErrorHandler/infra_error')

const Config = require('../config/config.json')
const db = Config.database


const sequelize = new Sequelize(db.databaseName, db.username,db.password,{
    host: db.host,
    dialect: db.dialect
})

const User = UserModel(sequelize, Sequelize)
const ExporterUser = ExporterUserModel(sequelize, Sequelize)

sequelize.sync({ force: false}).then(() => {
    console.log('tablas sincronizadas')
}).catch((err)=>{
    handleInfraError({ app: process.env.APP_NAME, method: 'Init DB', message: err.message})
})

module.exports= {
    User,
    ExporterUser
}