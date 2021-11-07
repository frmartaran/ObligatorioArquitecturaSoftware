module.exports = (sequelize, type) => {
    const sensorMeasurement = sequelize.define('sensorMeasurement', {
        observationName: type.STRING,
        unit: type.STRING
    });

    return sensorMeasurement
}