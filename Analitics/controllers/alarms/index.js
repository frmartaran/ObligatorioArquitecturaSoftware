const {sendEmail} = require('../../../Utils/email');

const eval = async (req,res) => {
    sendEmail()
    res.send()
};
module.exports = {eval}