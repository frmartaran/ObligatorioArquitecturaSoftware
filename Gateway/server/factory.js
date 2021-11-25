const{ 
    ExpressKey,
    ExpressServer
}= require('./express')

module.exports = {
    getServer(key){
        if (key==ExpressKey){
            return new ExpressServer()
        }
    }
}