//Load config
const dotenv = require('dotenv')
const env = dotenv.config()
const config = env.parsed
console.log(config.NODE_ENV)
//server.init(PORT)
