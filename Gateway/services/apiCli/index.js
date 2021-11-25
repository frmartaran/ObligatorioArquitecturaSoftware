const AxiosCli = require('./axios').AxiosCli
const MockCli = require('./mock').MockCli

const env = process.env.NODE_ENV

module.exports = {    
    getClient(){
        if(env == 'DEV'){
            return new MockCli()
        }else if(env == 'PROD'){
            return new AxiosCli()
        }   
    }
}