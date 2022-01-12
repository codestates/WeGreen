'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const badges = new Array(20).fill();
    for (let i = 0; i < badges.length; i++) badges[i] = { name: `${i + 1}` };
    await queryInterface.bulkInsert('badges', badges, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('badges', null, {});
  },
};
