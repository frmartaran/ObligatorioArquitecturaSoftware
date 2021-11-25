const app = require('./app')
const ExpressKey = 'EXP'
class ExpressServer{
    startServer(port){
        app.listen(
            port,
            () => console.log(`Start listening on port http://localhost:${port}`)
        )
    }
}

module.exports = { ExpressServer,ExpressKey }