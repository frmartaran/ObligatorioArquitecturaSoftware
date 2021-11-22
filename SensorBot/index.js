const sender = require('./sender')

async function recurse() {

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
}
recurse()