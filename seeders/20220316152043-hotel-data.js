"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Hotels", [
      {
        firstName: "Kiwi",
        lastName: "Mango",
        startDate: "2022/09/01",
        endDate: "2022/09/04",
        city: "Dallas",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
