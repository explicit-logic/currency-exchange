const {Currency} = require('../models');

const errorHandler = require('../lib/errorHandler');
const {convert} = require('../lib/currencyConverter');

const {query} = require('express-validator/check');
const {sanitizeQuery} = require('express-validator/filter');

module.exports = {

  validation: [
    sanitizeQuery(['from', 'to']).trim().customSanitizer(v => v.toUpperCase()),
    sanitizeQuery('amount').toFloat(),
    query(['from', 'to']).custom(v => v.length === 3),
    query('amount').isFloat().custom(v => v > 0),
  ],

  exec: errorHandler(async (req, res) => {

    const currencyFrom = await Currency.findOne({ where: {code: req.query.from.toUpperCase()} });
    const currencyTo = await Currency.findOne({ where: {code: req.query.to.toUpperCase()} });

    if (!currencyFrom || !currencyTo) {
      return res.status(400).send({
        message: 'Currency Not Found',
      });
    }

    let result = convert(currencyFrom, currencyTo, req.query.amount);

    return res.status(200).send({
      message: `${req.query.amount} ${req.query.from} = ${Number( (result).toFixed(3) )} ${req.query.to}`,
      result
    });

  }),

};
