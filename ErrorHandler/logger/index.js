const fs = require('fs')

const log = async (message,path,filename) => {
    path = `${path}/${filename}.txt`
    fs.writeFile(path,message, { flag: 'a+' }, err => {if(err) console.log(err.message);else console.log(`Write file in path: ${path}`)})
}

module.exports = {log}
