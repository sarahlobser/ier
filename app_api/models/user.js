module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        email : {
            type: DataTypes.STRING,
            allowNull : false,
            unique : true,
            primaryKey: true
        },
        password : {
            type: DataTypes.STRING,
            allowNull : false
        }, 
        first_name : {
            type: DataTypes.STRING,
            allowNull : true
        },
        last_name : {
            type: DataTypes.STRING,
            allowNull : true
        },
        type : {
            type: DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 0
        }
    },{
        classMethods: {
            associate : function(models) {
                User.hasMany(models.Address)
            },
            associate : function(models) {
                User.hasOne(models.Cart)
            }
        }
});

    return User;
}