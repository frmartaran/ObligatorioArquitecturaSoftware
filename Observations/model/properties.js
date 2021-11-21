module.exports = (sequelize, type) => {
    const properties = sequelize.define('properties', {
        propertyName: type.STRING,
        originalUnit: type.STRING,
        finalUnit: type.STRING,
        value: type.INTEGER,
        min: type.INTEGER,
        max: type.INTEGER
    });

    return properties
}