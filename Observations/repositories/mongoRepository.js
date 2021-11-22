const mongoose = require('mongoose');
const Config = require('../config/default.json');

const mongoDb = Config.mongoDb;

mongoose.connect(mongoDb.uri, mongoDb.options);

const properties = new mongoose.Schema({
    propertyName: String,
    originalUnit: String,
    finalUnit: String,
    value: Number,
    min: Number,
    max: Number
});

const transformedData = new mongoose.Schema({
    propertyName: String,
    unit: String,
    value: Number,
    min: Number,
    max: Number
});

const reading = new mongoose.Schema({
    ESN: String,
    name: String,
    location: String,
    date: Date,
    properties: [properties],
    transformedData: [transformedData]
});

const dailyReading = new mongoose.Schema({
    ESN: String,
    date: Date,
    sensorMeasurementName: String,
    averageValue: Number,
    totalSumValues: Number,
    totalCountValues: Number
});

reading.index({ 'ESN': 1, 'date': 1, 'properties.finalUnit': 1 });

dailyReading.index({ 'ESN': 1, 'date': 1, 'sensorMeasurementName': 1 });

const Reading = mongoose.model('Reading', reading, 'reading');

const DailyReading = mongoose.model('DailyReading', dailyReading, 'dailyReading');

module.exports = {
    Reading,
    DailyReading
}