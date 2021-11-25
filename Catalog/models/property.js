module.exports = (sequelize, type) => {
    const property = sequelize.define('property', {
        //sensorId: type.STRING(16),
        Name:{
            type: type.STRING(16),
            primaryKey: true,
            allowNull: false
        },
        unit: type.STRING,
    });

    return property
}