module.exports = function(sequelize, DataTypes) {
    var Prodart = sequelize.define("Prodart", {
        product_id : {
            type: DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true
            
        },
        cart_id : {
            type: DataTypes.INTEGER,
            allowNull : false,
            primaryKey : true
        },
        quantity : {
            type: DataTypes.INTEGER,
            allowNull : false
        }
    });

    return Prodart;
}