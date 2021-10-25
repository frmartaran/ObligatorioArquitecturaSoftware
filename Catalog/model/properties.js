module.exports = (sequelize, type) => {
    const obsProp = sequelize.define('properties', {
        //sensorId: type.STRING(16),
        observationName:{
            type: type.STRING(16),
            primaryKey: true,
            allowNull: false
        },
        unity: type.STRING,
    });

    return obsProp
}