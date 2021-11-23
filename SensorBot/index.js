const sender = require('./sender')
var fs = require('fs');


async function recurse() {

  while(true){
    var configFile = JSON.parse(fs.readFileSync('./config/default.json', 'utf8'));
    var sensor = configFile.sensor

    var json = createRequestJson(sensor)
      
    console.log(json)
    let resp = sender.sender(json)
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(configFile.latencia)
  }
}

recurse()

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function createRequestJson(sensor) { 
  
  let requestProperties = createrequestProperties(sensor)
  var json = {
    "ESN":sensor.ESN,
    "name":sensor.name,
    "location": sensor.location,
    "date":1636938049,
    "properties": requestProperties
  }
  return json
}

function createrequestProperties(sensor){
  let requestProperties = []

  sensor.properties.forEach( prop =>{
    const value = randomIntFromInterval(prop.minUnitValue, prop.maxUnitValue)
    let newProp = {
      "Name": prop.name,
      "Value": value,
      "unit": prop.unit
    }  
    requestProperties.push(newProp)
  })
  return requestProperties
}




/*
while(true){
    var i = Math.round(Math.random()*10) 
    var json = {
      "ESN":"S"+i,
      "name":"Model "+i,
      "location": Math.round(Math.random()*100)+"-"+Math.round(Math.random()*100),
      "date":1636938049,
      "properties":[
          {
              "Name": "temperature",
              "Value": 45,
              "unit":"F"
          }
          ]
      }
    let resp = sender.sender(json)
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(500)
  }
*/