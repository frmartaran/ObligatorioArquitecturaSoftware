require('dotenv').config()
const express = require('express')
const {handleApiError} = require('../ErrorHandler/api_errors')
const app = express()
const router = require('./routes')
const queue = require('./queues/queue');
const config = require('./config/default.json');

app.use('/analytics',router)
app.use(express.json())
app.use(handleApiError)

const port = process.env.PORT;

app.listen(port,()=>{
    console.log(`Server start listening on http://localhost:${port}`)
})

queue.validationDataQueue.process(config.validationData.numberOfProcesses, __dirname + config.validationData.processorLocation);