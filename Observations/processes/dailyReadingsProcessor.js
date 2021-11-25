const readingDatabaseService = require('../services/readingDatabaseService/readingDatabaseService');
const writingDatabaseService = require('../services/writingDatabaseService/writingDatabaseService');
const {sendEmail} = require('../../Utils/email');
const prefixMethod = "dailyReadingsProcessor";
const Config = require('./../config/default.json');

dailyReadingsProcessor = async (job) => {
    try{
        let queryGetLastDailyDate = await readingDatabaseService.GetLastDailyDate();
        let today = new Date();
        let yesterday = new Date(today.setDate(today.getDate()-1));
        let compareDate = new Date(yesterday);
        compareDate.setUTCHours(0,0,0,0);
        if(queryGetLastDailyDate[0]?.date?.getTime() !== compareDate.getTime()){
            let startDate = queryGetLastDailyDate.length === 0 ? new Date(yesterday) : queryGetLastDailyDate[0].date;
            startDate.setUTCHours(0,0,0,0);
            let endDate = yesterday;
            endDate.setUTCHours(23,59,59,999);
            let dailyReadings = await readingDatabaseService.GetDailyReadingsFromRawData(startDate, endDate);
            await writingDatabaseService.AddDailyReadings(dailyReadings);
        } else{
            console.log('promedio ya calculado');
        }
        return Promise.resolve();
    }catch (err){
        handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}`, message: err, payload: JSON.stringify(job.data) });
        let params = {
            from: Config.microserviceName,
            subject: Config.dailyProcessorFailureEmailSubject,
            text: Config.dailyProcessorFailureEmailText
        };
        sendEmail(params);
        return Promise.reject(err);
    }
}

module.exports = dailyReadingsProcessor;