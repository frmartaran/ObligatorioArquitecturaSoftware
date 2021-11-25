const readingDatabaseService = require('../services/readingDatabaseService');

class ReadingsLogic {
    calculateDailyAverage = async (differenceInDays, dateFrom, dateTo, measurementType, ESN, res, next) => {
        if(differenceInDays > 365){
            res.send("Error. La diferencia entre fechas es muy grande para el promedio diario.")
        }else {
            let dailyReadingsByMeasurementType = await readingDatabaseService.GetSensorDailyReadingsByMeasurementType(dateFrom, dateTo, measurementType, ESN);            
            let lastDateInDailyReadings = await readingDatabaseService.GetLastDailyDate();
            if(this.compareLastDailyDateWithToDate(dateTo, lastDateInDailyReadings)){
                let dayFromTodayReading = this.getDayFromTodayReading(lastDateInDailyReadings[0]?.date, dateFrom);
                let todayReadings = await readingDatabaseService.GetSensorDailyReadingsFromRawDataByMeasurementType(dayFromTodayReading, dateTo, measurementType, ESN);
                dailyReadingsByMeasurementType = dailyReadingsByMeasurementType.concat(todayReadings);
            };
            res.send(dailyReadingsByMeasurementType);
            next()
        }
    };

    calculateMonthlyAverage = async (differenceInDays, dateFrom, dateTo, measurementType, ESN, res, next) => {
        if(differenceInDays > 3650){
            res.send("Error. La diferencia entre fechas es muy grande para el promedio mensual.")
        }else {
            let monthlyReadingsByMeasurementType = await readingDatabaseService.GetSensorMonthlyReadingsByMeasurementType(dateFrom, dateTo, measurementType, ESN);
            let lastDateInDailyReadings = await readingDatabaseService.GetLastDailyDate();
            if(this.compareLastDailyDateWithToDate(dateTo, lastDateInDailyReadings)){
                let dayFromTodayReading = this.getDayFromTodayReading(lastDateInDailyReadings[0]?.date, dateFrom);
                let todayMonthlyReadings = await readingDatabaseService.GetSensorMonthlyReadingsFromRawDataByMeasurementType(dayFromTodayReading, dateTo, measurementType, ESN);
                todayMonthlyReadings.forEach(reading => {
                    let todayMonth = monthlyReadingsByMeasurementType?.find(monthlyReading => monthlyReading.month === reading.month && monthlyReading.year === reading.year);
                    if(todayMonth){
                        let totalReadings = todayMonth.totalCountValues + reading.totalCountValues;
                        let totalValueSum = todayMonth.totalSumValues + reading.totalSumValues;
                        todayMonth.averageValue = totalValueSum / totalReadings;
                        todayMonth.totalCountValues = totalReadings;
                        todayMonth.totalSumValues = totalValueSum;
                    }else {
                        monthlyReadingsByMeasurementType.push({
                            totalSumValues: reading.totalSumValues,
                            totalCountValues: reading.totalCountValues,
                            month: reading.month,
                            year: reading.year,
                            averageValue: reading.totalSumValues / reading.totalCountValues
                        })
                    }
                });
            };
            res.send(monthlyReadingsByMeasurementType);
            next();
        }
    };

    calculateYearlyAverage = async (dateFrom, dateTo, measurementType, ESN, res, next) => {
        let yearlyReadingsByMeasurementType = await readingDatabaseService.GetSensorYearlyReadingsByMeasurementType(dateFrom, dateTo, measurementType, ESN);
        let lastDateInDailyReadings = await readingDatabaseService.GetLastDailyDate();
        if(this.compareLastDailyDateWithToDate(dateTo, lastDateInDailyReadings)){
            let dayFromTodayReading = this.getDayFromTodayReading(lastDateInDailyReadings[0]?.date, dateFrom);
            let todayYearlyReadings = await readingDatabaseService.GetSensorYearlyReadingsFromRawDataByMeasurementType(dayFromTodayReading, dateTo, measurementType, ESN);
            todayYearlyReadings.forEach(reading => {
                let todayYear = yearlyReadingsByMeasurementType?.find(yearlyReading => yearlyReading.year === reading.year);
                if(todayYear){
                    let totalReadings = todayYear.totalCountValues + reading.totalCountValues;
                    let totalValueSum = todayYear.totalSumValues + reading.totalSumValues;
                    todayYear.averageValue = totalValueSum / totalReadings;
                    todayYear.totalCountValues = totalReadings;
                    todayYear.totalSumValues = totalValueSum;
                }else {
                    yearlyReadingsByMeasurementType.push({
                        totalSumValues: reading.totalSumValues,
                        totalCountValues: reading.totalCountValues,
                        year: reading.year,
                        averageValue: reading.totalSumValues / reading.totalCountValues
                    })
                }
            });
        };
        res.send(yearlyReadingsByMeasurementType);
        next();
    };

    compareLastDailyDateWithToDate = (dateTo, lastDateInDailyReadings) => {
        if(lastDateInDailyReadings.length > 0){
            let dateToCompare = new Date(dateTo);
            dateToCompare.setUTCHours(0,0,0,0);
            return (lastDateInDailyReadings.length > 0 
                && (dateToCompare.getYear() === lastDateInDailyReadings[0].date.getYear()
                && dateToCompare.getDate() > lastDateInDailyReadings[0].date.getDate())
                || dateToCompare.getYear() > lastDateInDailyReadings[0].date.getYear());
        }else{
            return true;
        }

    }

    getDayFromTodayReading = (lastDayInDailyReadings, dateFrom) => {
        if(lastDayInDailyReadings){
            let dayFromTodayReading = new Date(lastDayInDailyReadings.setDate(new Date(lastDayInDailyReadings.getDate() + 1)));
            dayFromTodayReading.setUTCHours(0,0,0,0);
            return dayFromTodayReading;
        }else{
            return dateFrom;
        }
    }
}

module.exports = ReadingsLogic;