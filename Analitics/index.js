require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')

app.use('/analytics',router)
app.use(express.json())
const port = process.env.PORT 

app.listen(port,()=>{
    console.log(`Server start listening on http://localhost:${port}`)
})