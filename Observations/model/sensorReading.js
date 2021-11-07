module.exports = (sequelize, type) => {
    const sensorReading = sequelize.define('sensorReading', {
        ESN:{
            type: type.STRING(16),
            primaryKey: true,
            allowNull: false
        },
        name: type.STRING,
        location: type.STRING,
        date: {
            type: 'TIMESTAMP',
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            allowNull: false
        }
    });

    return sensorReading
}