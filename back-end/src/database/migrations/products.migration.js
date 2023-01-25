'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.DECIMAL(4, 2)
      },
      url_image: {
        type: Sequelize.STRING
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};