module.exports = function(sequelize, DataTypes) {
    var Employee = sequelize.define("Employee", {
        email : {
            type: DataTypes.STRING,
            allowNull : false,
            unique : true,
            primaryKey: true
        },
        name :  DataTypes.STRING, 
        title : DataTypes.STRING,
        bio : DataTypes.STRING
    });

    return Employee;
}