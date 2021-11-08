module.exports = (sequelize, type) => {
    const catalogUnit = sequelize.define('catalogUnit', {
        observationName: type.STRING,
        unit: type.STRING
    });

    return catalogUnit
}