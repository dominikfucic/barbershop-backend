"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("services", [
      {
        name: "Haircut",
        price: 20,
        duration: 30,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum sem velit, at gravida tortor tincidunt eget.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Beard",
        price: 10,
        duration: 20,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum sem velit, at gravida tortor tincidunt eget.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Haircut and beard",
        price: 30,
        duration: 50,
        description:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla bibendum sem velit, at gravida tortor tincidunt eget.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("services", null, {});
  },
};
