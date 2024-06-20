'use strict';
const fs = require('fs').promises
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const dataStr = await fs.readFile(`./data/categories.json`, 'utf-8')
    const dataJSON = JSON.parse(dataStr)

    const categories = dataJSON.map(el => {
      delete el.id;
      el.createdAt = new Date();
      el.updatedAt = new Date();

      return el
    })
    await queryInterface.bulkInsert("Categories", categories, {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Categories", null, {})
  }
};
