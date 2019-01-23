'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Currencies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      canBuy: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      canSell: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      rate: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(13,8)
      },
      minSalePrice: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(13,2)
      },
      maxSalePrice: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(13,2)
      },
      minBuyPrice: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(13,2)
      },
      maxBuyPrice: {
        allowNull: false,
        defaultValue: 0,
        type: Sequelize.DECIMAL(13,2)
      },
      code: {
        type: Sequelize.CHAR(3)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Currencies');
  }
};
