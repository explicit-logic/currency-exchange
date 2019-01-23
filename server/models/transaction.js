'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    type: DataTypes.ENUM('debit', 'credit'),
    status: DataTypes.ENUM('success', 'failed'),
    currencyId: DataTypes.INTEGER,
    rate: DataTypes.DECIMAL,
    amount: DataTypes.DECIMAL,
    cardNumber: DataTypes.CHAR,
    payload: DataTypes.JSON
  }, {});
  Transaction.associate = function(models) {
    Transaction.belongsTo(models.Currency, {
      foreignKey: 'currencyId',
    });
  };
  return Transaction;
};
