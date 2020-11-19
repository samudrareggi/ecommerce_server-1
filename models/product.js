'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsTo(models.Category)
      Product.hasMany(models.Cart)
    }
  };
  Product.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Name cannot be empty"}
      }
    },
    image_url: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
      validate: {
        min: { 
          args: 1, 
          msg: "Please set price more than 0"
        },
        isNumeric: {msg: "Price is filled in a string"}
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      validate: {
        isValid(value) {
          if (value < 0 ) {
            throw new Error('Please set stock more than or equal 0')
          }
        },
        isNumeric: {msg: "Stock is filled in a string"}
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};