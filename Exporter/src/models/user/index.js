module.exports = (sequelize, type) => {
    const user = sequelize.define('user', {
        username:{
            type: type.STRING(16),
            primaryKey: true,
            allowNull: false
        },
        password:{
            type:type.STRING,
            allowNull: false
        } 
    });
    return user
}