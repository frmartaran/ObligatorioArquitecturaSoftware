require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controllers/controller')
const {handleApiError} = require('../ErrorHandler/api_errors')

const app = express()
const port = process.env.PORT;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(handleApiError)

app.use('/catalog', controller)

app.listen(port, () => {

})