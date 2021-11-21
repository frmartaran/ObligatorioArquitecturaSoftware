require('dotenv').config()
const express = require('express')
const Queue = require('bull')

const app = express()
const router = require('./routes')

app.use('/analytics',router)
app.use(express.json())
const port = process.env.PORT 
const validationDataQueue = new Queue(process.env.QUEUE_NAME);

app.listen(port,()=>{
    console.log(`Server start listening on http://localhost:${port}`)
})

app.post('/test',(req,res)=>{
    validationDataQueue.add(req.body)
    res.send()
})


validationDataQueue.process(8,__dirname+'/services/processes/validate/index.js')