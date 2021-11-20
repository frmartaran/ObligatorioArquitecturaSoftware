module.exports = (sequelize, type) => {
    const sensorReading = sequelize.define('sensorReading', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        ESN:{
            type: type.STRING(16),
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