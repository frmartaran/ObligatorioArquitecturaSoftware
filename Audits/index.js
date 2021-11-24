const { log } = require('../ErrorHandler/logger')
const audit = (data) => async (req, res, next) => {
    const msg = `\n[Event: ${req.event}] [Data: ${req.data}] [APP: ${data.app}]`
    const path = __dirname
    const filename = 'audits'
    log(msg, path, filename)
    next()
}
function createBaseAudit(app){
    const baseAudit = {
        event: '',
        data: '',
        app: app
    }
    return baseAudit
}

module.exports = { audit, createBaseAudit }