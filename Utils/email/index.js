const nodemailer = require('nodemailer')
var fs = require('fs');

const sendEmail = async (params) =>{
    let receivers = JSON.parse(fs.readFileSync(__dirname+'/receivers.json','utf8'))
    const transporter = createTransport(receivers)
    const mailOptions = createMailOptions(params, receivers)
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error){
            console.error(`Error sending email: ${error}`)
        }
        const json = JSON.stringify(info)
        console.error(`Info sending email: ${json}`)
    })
}

function createTransport(receivers){
    let hostParam = receivers.senderHostParam
    let userParam = receivers.senderUserParam
    let passParam = receivers.senderPassParam

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

function createMailOptions(params, receivers){
    let emailTo = ''
    let first = true
    receivers.emails.forEach(email =>{
        if(first){
            emailTo += email
            first = false
        }else{
            emailTo +=','
            emailTo += email
        }
    })
    const mailOptions = {
        from: receivers.from,
        to: emailTo,
        subject: receivers.subject,
        text:`Equipo!!,\n el sensor ${params?.sensor_ESN} esta registrando valores anormales en la propiedad ${params?.propertyParam}`
    }
    return mailOptions
}

module.exports = {sendEmail}