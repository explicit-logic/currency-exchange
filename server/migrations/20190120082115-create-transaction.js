'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        allowNull: false,
        defaultValue: 'debit',
        type: Sequelize.ENUM('debit', 'credit')
      },
      status: {
        allowNull: false,
        defaultValue: 'success',
        type: Sequelize.ENUM('success', 'failed')
      },
      currencyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      rate: {
        allowNull: false,
        type: Sequelize.DECIMAL(13,8)
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(13,2)
      },
      cardNumber: {
        type: Sequelize.CHAR(16)
      },
      payload: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('Transactions');
  }
};
