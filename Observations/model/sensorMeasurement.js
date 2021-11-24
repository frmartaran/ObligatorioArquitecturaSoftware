module.exports = (sequelize, type) => {
    const sensorMeasurement = sequelize.define('sensorMeasurement', {
        name: type.STRING,
        unit: type.STRING,
        value: type.INTEGER
    });

    return sensorMeasurement
}