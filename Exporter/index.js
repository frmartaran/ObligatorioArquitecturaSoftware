require('dotenv').config()

const express = require('express')
const app = express()
const router = require('./src/routes')

app.use(express.json())
app.use(router)
const port = process.env.PORT
console.log(port)
app.listen(port,()=>{
    console.log(`Start listening on port http://localhost:${port}`)
})