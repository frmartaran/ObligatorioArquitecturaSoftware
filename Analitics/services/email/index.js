const nodemailer = require('nodemailer')
var name = "Test"
var sensor_ESN = "Test sensor"
var propertyParam = "Temp"
var email = "d.baccino@outlook.com"
const sendEmail = async (params) =>{
    const transporter = createTransport()
    const mailOptions = createMailOptions(params)
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error(`Error sending email: ${error}`)
        }
        const json = JSON.stringify(info)
        console.error(`Info sending email: ${json}`)
    })
}

function createTransport(gmailInfo){
    var hostParam = new Object()
    var userParam = new Object()
    var passParam = new Object()
    if (gmailInfo){
        hostParam = 'smtp.gmail.com' 
        userParam = gmailInfo.user
        passParam = gmailInfo.pass
    }else{
        hostParam = 'smtp.ethereal.email' 
        userParam = 'ulices.gerhold8@ethereal.email'
        passParam = 'fhpJX8Bh9nycX3Ydyz'
    }

    const transporter = nodemailer.createTransport({
        host: hostParam,
        port: 587,
        auth: {
            user: userParam,
            pass: passParam
        }
    });
    return transporter
}

function createMailOptions(params){
    const mailOptions = {
        from: 'Analytics',
        to: email,
        subject: 'Sensor en Alerta!!',
        text:`${name},\n el sensor ${sensor_ESN} esta registrando valores anormales en la propiedad ${propertyParam}`
    }
    return mailOptions
}

module.exports = {sendEmail}