module.exports = (sequelize, type) => {
    const catalogUnit = sequelize.define('catalogUnit', {
        name: type.STRING,
        unit: type.STRING,
        value: type.INTEGER
    });

    return catalogUnit
}