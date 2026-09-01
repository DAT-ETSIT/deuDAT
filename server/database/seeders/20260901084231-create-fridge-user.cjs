"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("users", [
      {
        issuer: "internal",
        subject: "fridge",
        email: "fridge@internal.invalid",
        username: "fridge",
        givenName: "Fridge",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("users", {
      issuer: "internal",
      subject: "fridge",
    });
  },
};
