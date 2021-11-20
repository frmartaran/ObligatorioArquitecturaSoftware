const {sendEmail} = require('../../services/email');

const eval = async (req,res) => {
    sendEmail()
    res.send()
};
module.exports = {eval}