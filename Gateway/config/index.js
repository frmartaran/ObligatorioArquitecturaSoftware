require('dotenv').config()
const NODE_ENV = process.env.NODE_ENV;
let configEnv;
let config = require('./envs/default.json');
switch (NODE_ENV){
    case 'PROD':
        configEnv = require('./envs/prod.json')
        break;
    case 'DEV':
        configEnv = require('./envs/development.json')
        break;
    default:
        console.log('missmatch env. Using DEV as default')    
        configEnv = require('./envs/development.json')
        break;
}

Object.assign(config,configEnv)

module.exports = config