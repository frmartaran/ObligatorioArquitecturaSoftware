const sender = require('../../../../services/piplineSender')
const postData = async (req,res,next) => {
    sender.sendData(req.body)
    res.send()
};

module.exports = {postData}