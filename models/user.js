'use strict';
const {
  Model
} = require('sequelize');
const {hashPassword} = require("../helpers/bcryptjs")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: {msg: "Name cannot be empty"}
      }
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: {
        args: "email",
        msg: "Email address already exists!"
      },
      validate: {
        notEmpty: {msg: "Email cannot be empty"}
      }
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        isValid(value) {
          if (value.length < 8) {
            throw new Error('Password atleast 8 characters or more')
          }
        }
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "customer"
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password)
  })
  return User;
};