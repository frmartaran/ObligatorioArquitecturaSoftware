const readingDatabaseService = require('../services/readingDatabaseService');

dailyReadingsProcessor = async (job) => {
    // get last day with processed data
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
        await readingDatabaseService.AddDailyReadings(dailyReadings);
    } else{
        console.log('promedio ya calculado');
    }
    return Promise.resolve();
}

module.exports = dailyReadingsProcessor;