module.exports = function(sequelize, DataTypes) {
    var Address = sequelize.define("Address", {
        name : {
            type: DataTypes.STRING,
            allowNull : false,
            primaryKey : true
        },
        user_email : {
            type: DataTypes.STRING,
            allowNull : false,
            primaryKey : true
        }, 
        street : {
            type: DataTypes.STRING,
            allowNull : false
        },
        city : {
            type: DataTypes.STRING,
            allowNull : false
        },
        state : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        zip : {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        classMethods: {
            associate : function(models) {
                Address.belongsTo(models.User, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false
                    }
                })
            }
        }
});

    return Address;
}