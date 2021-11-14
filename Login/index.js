const express = require('express')
const bodyParser = require('body-parser')
const controller = require('./controllers/controller')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/login', controller)

app.listen(3000, () => {

})