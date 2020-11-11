'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const {hashPassword} = require("../helpers/bcryptjs")
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    const data = [{
      email: "admin@email.com",
      password: hashPassword("12345678"),
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    }]

    return queryInterface.bulkInsert("Users", data, {})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Users", null, {})
  }
};
