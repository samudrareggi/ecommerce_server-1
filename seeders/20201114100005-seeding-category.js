'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = [
      {
      email: "Shoes",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      email: "Jackets",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      email: "Electronics",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      email: "Gadgets",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      email: "T-shirt",
      createdAt: new Date(),
      updatedAt: new Date(),
      }
    ]

    return queryInterface.bulkInsert("Categories", data, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Categories", null, {})
  }
};
