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
      name: "Shoes",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      name: "Jackets",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      name: "Electronics",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      name: "Gadgets",
      createdAt: new Date(),
      updatedAt: new Date(),
      },
      {
      name: "T-shirt",
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
