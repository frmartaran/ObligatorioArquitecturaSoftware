const mongoose = require('mongoose');
const { handleInfraError } = require('../../ErrorHandler/infra_error')

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 36000,
}).then(()=>console.log('Connected to mongo!')).catch((err)=>{
    handleInfraError({ app: process.env.APP_NAME, method: 'Init Mongo DB', message: err.message})
});

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
    averageValue: Number
});

reading.index({ 'ESN': 1, 'date': 1, 'properties.finalUnit': 1 });

const Reading = mongoose.model('Reading', reading, 'reading');

const DailyReading = mongoose.model('DailyReading', dailyReading, 'dailyReading');

module.exports = {
    Reading,
    DailyReading
}