module.exports = function(sequelize, DataTypes) {
    var Cart = sequelize.define("Cart", {
        user_email : {
            type: DataTypes.STRING,
            allowNull : false
        }
    }, {
        classMethods: {
            associate : function(models) {
                Cart.belongsToMany(models.Product, {
                    through : {
                        model : models.Prodart
                    },
                    foreignKey : 'cart_id'
            })
            
        }
    }
});

    return Cart;
}