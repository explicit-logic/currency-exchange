const {Transaction, Currency} = require('../models');

const errorHandler = require('../lib/errorHandler');

const {check} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

module.exports = {

  validation: [
    sanitizeBody('currency').trim().customSanitizer(v => v.toUpperCase()),
    sanitizeBody('amount').toFloat(),
    check('currency').custom(v => v.length === 3),
    check('amount').isFloat().custom(v => v > 0),
    check('cardNumber').optional().isCreditCard(),
  ],

  up: errorHandler(async (req, res) => {

    let data = {
      type: 'debit'
    };

    if(req.body.cardNumber) data.cardNumber = req.body.cardNumber;

    const currency = await Currency.findOne({ where: {code: req.body.currency.toUpperCase()} });

    if (!currency) {
      return res.status(400).send({
        message: 'Currency Not Found',
      });
    }

    data.currencyId = currency.id;
    data.rate = currency.rate;
    data.amount = req.body.amount;

    const transaction = await Transaction.create(data);

    return res.status(201).send(transaction);

  }),

};
