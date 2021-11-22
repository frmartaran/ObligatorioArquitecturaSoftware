require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controllers/controller')
const app = express()
const port = process.env.PORT
const {handleApiError} = require('../ErrorHandler/api_errors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/login', controller)
app.use(handleApiError)

app.listen(port, () => {
})