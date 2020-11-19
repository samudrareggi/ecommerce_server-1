'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User)
      Cart.belongsTo(models.Product)
    }
  };
  Cart.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "User cannot be empty"
        },
        notEmpty: {msg: "User cannot be empty"}
      }
    },
    ProductId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "Product cannot be empty"
        },
        notEmpty: {
          msg: "Product cannot be empty"
        }
      }
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "Amount cannot be empty"
        },
        isNumeric: {msg: "Input not allowed"},
        notEmpty: {msg: "Amount cannot be empty"},
        min: { 
          args: 1, 
          msg: "Amount must greater than 0"
        }
      },
      defaultValue: 0
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};