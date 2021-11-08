module.exports = (sequelize, type) => {
    const sensorReading = sequelize.define('sensorReading', {
        ESN:{
            type: type.UUID,
            primaryKey: true,
            allowNull: false
        },
        name: type.STRING,
        location: type.STRING,
        date: {
            type: 'TIMESTAMP',
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    });

    return sensorReading
}