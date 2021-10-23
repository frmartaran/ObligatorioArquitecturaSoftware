module.exports = (sequelize, type) => {
    return sequelize.define('sensor', {
        ESN:{
            type: type.INTEGER,
            primaryKey: true
        },
        model: type.STRING,
        name: type.STRING,
        location: type.STRING
    });
}