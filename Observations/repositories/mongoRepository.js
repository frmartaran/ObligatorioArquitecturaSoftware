const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/test', {
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 3600,
});

const catalogUnit = new mongoose.Schema({
    observationName: String,
    unit: String
});

const sensorMeasurement = new mongoose.Schema({
    name: String,
    unit: String,
    value: Number
});

const reading = new mongoose.Schema({
    ESN: String,
    location: String,
    date: Date,
    catalogUnit: [catalogUnit],
    sensorMeasurement: [sensorMeasurement]
});

const Reading = mongoose.model('Reading', reading, 'reading');

module.exports = {
    Reading
}