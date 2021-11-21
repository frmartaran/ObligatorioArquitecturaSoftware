module.exports = (sequelize, type) => {
    const exporterUser = sequelize.define('user_exporter', {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name:{
            type: type.STRING(16),
            allowNull: false            
        },
        description: {
            type: type.STRING,
            allowNull: false
        },
        consumeDate: type.BIGINT,
    });

    return exporterUser
}