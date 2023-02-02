"use strict";
const crypto = require("crypto");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const salt = crypto.randomBytes(16);
    const hashedPassword = crypto.pbkdf2Sync(
      "12345",
      salt,
      310000,
      32,
      "sha256"
    );

    await queryInterface.bulkInsert("appointments", [
      {
        userId: 1,
        serviceId: 1,
        barberId: 1,
        startDateTime: new Date(new Date().setHours(8, 0, 0)),
        endDateTime: new Date(new Date().setHours(8, 30, 0)),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("appointments", null, {});
  },
};
