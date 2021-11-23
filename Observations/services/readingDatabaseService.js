const ReadingDatabaseRepository = require('../repositories/readingDatabaseRepository');

const ReadingDatabaseService = {
    Add: async (data) => {
        let newSensorReading = await ReadingDatabaseRepository.Add(data);
        return newSensorReading;
    },
    Get: (dateFrom, pageLength) => {
        let query = ReadingDatabaseRepository.Get(dateFrom, pageLength);
        return query;
    },
    GetLastDailyDate: async () => {
        let query = await ReadingDatabaseRepository.GetLastDailyDate();
        return query;
    },
    GetDailyReadingsFromRawData: async (startDate, endDate) => {
        let query = await ReadingDatabaseRepository.GetDailyReadingsFromRawData(startDate, endDate);
        return query;
    },
    GetSensorDailyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await ReadingDatabaseRepository.GetSensorDailyReadingsFromRawDataByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorMonthlyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await ReadingDatabaseRepository.GetSensorMonthlyReadingsFromRawDataByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorYearlyReadingsFromRawDataByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await ReadingDatabaseRepository.GetSensorYearlyReadingsFromRawDataByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorDailyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await ReadingDatabaseRepository.GetSensorDailyReadingsByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorMonthlyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await ReadingDatabaseRepository.GetSensorMonthlyReadingsByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    GetSensorYearlyReadingsByMeasurementType: async (startDate, endDate, measurementType, ESN) => {
        let query = await ReadingDatabaseRepository.GetSensorYearlyReadingsByMeasurementType(startDate, endDate, measurementType, ESN);
        return query;
    },
    AddDailyReadings: async (data) => {
        let newSensorReading = await ReadingDatabaseRepository.AddDailyReadings(data);
        return newSensorReading;
    }
}
module.exports = ReadingDatabaseService