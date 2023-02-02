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

    await queryInterface.bulkInsert("users", [
      {
        firstName: "Test",
        lastName: "User",
        email: "testuser@mail.com",
        password: hashedPassword,
        salt: salt,
        role: "customer",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Test",
        lastName: "Barber",
        email: "testbarber@mail.com",
        password: hashedPassword,
        salt: salt,
        role: "barber",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
