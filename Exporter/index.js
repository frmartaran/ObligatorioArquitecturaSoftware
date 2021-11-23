require('dotenv').config()

const express = require('express')
const app = express()
const router = require('./src/routes')
const {handleApiError} = require('../ErrorHandler/api_errors')

app.use(express.json())
app.use(router)
app.use(handleApiError)

const port = process.env.PORT
console.log(port)
app.listen(port,()=>{
    console.log(`Start listening on port http://localhost:${port}`)
})