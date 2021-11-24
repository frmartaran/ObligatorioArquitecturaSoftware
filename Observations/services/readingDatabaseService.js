const databaseRepository = require('../repositories/databaseRepository');

const databaseService = {
    Add: async (data) => {
        let newSensorReading = await databaseRepository.Add(data);
        return newSensorReading;
    },
    Get: async (dateFrom, pageLength) => {
        let query = await databaseRepository.Get(dateFrom, pageLength);
        return query;
    },
    GetLastDailyDate: async () => {
        let query = await databaseRepository.GetLastDailyDate();
        return query;
    },
    GetDailyReadingsFromRawData: async (startDate, endDate) => {
        let query = await databaseRepository.GetDailyReadingsFromRawData(startDate, endDate);
        return query;
    },
    GetSensorDailyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await databaseRepository.GetSensorDailyReadingsFromRawDataByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorMonthlyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await databaseRepository.GetSensorMonthlyReadingsFromRawDataByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorYearlyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await databaseRepository.GetSensorYearlyReadingsFromRawDataByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorDailyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await databaseRepository.GetSensorDailyReadingsByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorMonthlyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await databaseRepository.GetSensorMonthlyReadingsByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorYearlyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await databaseRepository.GetSensorYearlyReadingsByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    AddDailyReadings: async (data) => {
        let newSensorReading = await databaseRepository.AddDailyReadings(data);
        return newSensorReading;
    }
}
module.exports = databaseService