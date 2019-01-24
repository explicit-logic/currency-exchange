const Decimal = require('decimal.js');

module.exports = {
  /**
   * Converts the amount to another currency
   * @param {Object} from - Object of Currency
   * @param {Object} to - Object of Currency
   * @param {number} amount - A positive number
   */
  convert(from, to, amount){
    amount = new Decimal(amount);
    return amount.times(from.rate).div(to.rate);
  }

};
