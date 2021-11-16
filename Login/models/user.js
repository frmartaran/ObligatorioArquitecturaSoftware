module.exports = (sequelize, type) => {
    const sensor = sequelize.define('user', {
        name:{
            type: type.STRING(16),
            primaryKey: true,
            allowNull: false
        },
        password: type.STRING,
        role: type.STRING
    });

    return sensor
}