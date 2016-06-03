module.exports = function(sequelize, DataTypes) {
    var Product = sequelize.define("Product", {
        category : {
            type: DataTypes.STRING,
            allowNull : false
        }, 
        price : {
            type: DataTypes.DECIMAL,
            allowNull : false
        },
        description : {
            type: DataTypes.STRING,
            allowNull : false
        },
        brand : {
            type: DataTypes.STRING,
            allowNull : false,
        },
        rating : {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        name : {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity : {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        classMethods: {
            associate : function(models) {
                Product.belongsToMany(models.Cart, {
                    through : {
                        model : models.Prodart
                    },
                    foreignkey : 'product_id'
                })
            }
        }
    });

    return Product;
}