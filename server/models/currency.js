'use strict';
module.exports = (sequelize, DataTypes) => {
  const Currency = sequelize.define('Currency', {
    canBuy: DataTypes.BOOLEAN,
    canSell: DataTypes.BOOLEAN,
    rate: DataTypes.DECIMAL,
    minSalePrice: DataTypes.DECIMAL,
    maxSalePrice: DataTypes.DECIMAL,
    minBuyPrice: DataTypes.DECIMAL,
    maxBuyPrice: DataTypes.DECIMAL,
    code: DataTypes.CHAR
  }, {});
  Currency.associate = function(models) {
    // associations can be defined here
  };
  return Currency;
};
