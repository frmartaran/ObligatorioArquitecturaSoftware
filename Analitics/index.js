require('dotenv').config()
const express = require('express')
const Queue = require('bull')
const {handleApiError} = require('../ErrorHandler/api_errors')
const app = express()
const router = require('./routes')

app.use('/analytics',router)
app.use(express.json())
app.use(handleApiError)

const port = process.env.PORT 
const validationDataQueue = new Queue(process.env.QUEUE_NAME);

app.listen(port,()=>{
    console.log(`Server start listening on http://localhost:${port}`)
})

validationDataQueue.process(8,__dirname+'/services/processes/validate/index.js')