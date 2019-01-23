'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.changeColumn('Currencies', 'code', {
      type: Sequelize.CHAR(3),
      unique: true
    });

  },

  down: (queryInterface, Sequelize) => {

  }
};
