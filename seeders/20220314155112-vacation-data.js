"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert("Hotels", [
      {
        name: "Hotel",
        description: "Great, fun hotel",
        starRating: "4",
        phoneNumber: "123",
        email: "123@13",
        amenities: "fhsfjdhfkas",
        hotelImageUrl: "gsjdhsdjasd",
        room1ImageUrl: "dhgfmdfjgsdfj",
        rooom2ImageUrl: "dhgfjsgdfjgds",
        address: "dgfjdfdf",
        vacationId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
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
