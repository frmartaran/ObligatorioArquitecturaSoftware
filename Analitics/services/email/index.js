const nodemailer = require('nodemailer')
var fs = require('fs');

const credentials = {
    user: "OblArqui2021@gmail.com",
    pass: "Arqui2021"
}

const sendEmail = async (params) =>{
    const transporter = createTransport(credentials)
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
        userParam = process.env.ETHEREAL_USER
        passParam = process.env.ETHEREAL_PASS
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
    var emails = JSON.parse(fs.readFileSync(__dirname+'/receivers.json','utf8'))
    var emailTo = emails.email
    var key = 'email'
    var index = 2
    var tempEmail = "expectedEmail"
    while(tempEmail){
        tempEmail = emails[key+index];
        if(tempEmail){
            emailTo +=','
            emailTo += tempEmail
            index++
        }
    }
    const mailOptions = {
        from: 'Analytics',
        to: emailTo,
        subject: 'Sensor en Alerta!!',
        text:`Equipo!!,\n el sensor ${params.sensor_ESN} esta registrando valores anormales en la propiedad ${params.propertyParam}`
    }
    return mailOptions
}

module.exports = {sendEmail}