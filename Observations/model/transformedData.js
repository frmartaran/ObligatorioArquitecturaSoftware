module.exports = (sequelize, type) => {
    const transformedData = sequelize.define('transformedData', {
        propertyName: type.STRING,
        unit: type.STRING,
        value: type.INTEGER,
        min: type.INTEGER,
        max: type.INTEGER
    });

    return transformedData
}