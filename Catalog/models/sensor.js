module.exports = (sequelize, type) => {
    const sensor = sequelize.define('sensor', {
        ESN:{
            type: type.STRING(16),
            primaryKey: true,
            allowNull: false
        },
        model: type.STRING,
        name: type.STRING,
        location: type.STRING
    });

    return sensor
}