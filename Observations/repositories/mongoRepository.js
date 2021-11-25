const mongoose = require('mongoose');
const Config = require('../config/default.json');
const { handleInfraError } = require('../../ErrorHandler/infra_error');
const {sendEmail} = require('../../Utils/email');
const prefixMethod = "connection";
const parser = require('cron-parser');

const mongoDb = Config.database;

mongoose.connect(mongoDb.uri, mongoDb.options)
  .then(() => {
    console.log('connected to mongo successfully')
  })
  .catch(err => {
      if(err.message.includes('ECONNREFUSED')){
        let cronExp = Config['dailyProcessorCronExpression:'];
        let interval = parser.parseExpression(cronExp);
        let params = {
          from: Config.microserviceName,
          subject: Config.connectionRefusedEmailSubject,
          text: Config.connectionRefusedEmailText + interval.next().toString()
        };
        sendEmail(params);
      };
      handleInfraError({ app: process.env.APP_NAME, method: `${prefixMethod}`, message: err, payload: '' });
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
    processTime: Number,
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