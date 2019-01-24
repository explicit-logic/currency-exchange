const {Transaction, Currency, sequelize} = require('../models');

const errorHandler = require('../lib/errorHandler');
const {convert} = require('../lib/currencyConverter');

const {body} = require('express-validator/check');
const {sanitizeBody} = require('express-validator/filter');

const Decimal = require('decimal.js');

module.exports = {

  validation: [
    sanitizeBody(['from', 'to']).trim().customSanitizer(v => v.toUpperCase()),
    sanitizeBody('amount').toFloat(),
    body(['from', 'to']).custom(v => v.length === 3),
    body('amount').isFloat().custom(v => v > 0),
    body('cardNumber').optional().isCreditCard(),
  ],

  exec: errorHandler(async (req, res) => {

    let amountCurrencyTo, amountCurrencyFrom,
      totalDebit, totalCredit, balance;

    const [currencyFrom, currencyTo] = await Promise.all([
      Currency.findOne({
        where: {
          canBuy: true,
          code: req.body.from.toUpperCase()
        }
      }),
      Currency.findOne({
        where: {
          canSell: true,
          code: req.body.to.toUpperCase()
        }
      })
    ]);

    if (!currencyFrom || !currencyTo) {
      return res.status(400).send({
        message: 'One of the currencies is not available',
      });
    }

    amountCurrencyFrom = req.body.amount;
    amountCurrencyTo = convert(currencyFrom, currencyTo, amountCurrencyFrom);

    [totalDebit, totalCredit] = await Promise.all([
      Transaction.sum('amount', {
        where: {
          type: 'debit',
          currencyId: currencyTo.id
        }
      }),
      Transaction.sum('amount', {
        where: {
          type: 'credit',
          currencyId: currencyTo.id
        }
      })
    ]);

    // if null replace to zero
    totalDebit = totalDebit || 0;
    totalCredit = totalCredit || 0;

    balance = new Decimal(totalDebit).minus(totalCredit);

    if(balance.lt(amountCurrencyTo)){
      return res.status(400).send({
        message: `${currencyTo.code} is not available`,
      });
    }

    const dbTransaction = await sequelize.transaction();

    try {

      const debitRecord = await Transaction.create({
        type: 'debit',
        currencyId: currencyFrom.id,
        rate: currencyFrom.rate,
        amount: Number(amountCurrencyFrom.toFixed(2)),
        cardNumber: req.body.cardNumber || null
      }, {transaction: dbTransaction});

      const creditRecord = await Transaction.create({
        type: 'credit',
        currencyId: currencyTo.id,
        rate: currencyTo.rate,
        amount: Number( amountCurrencyTo.toFixed(2) ),
        cardNumber: currencyTo.cardNumber || null
      }, {transaction: dbTransaction});

      await dbTransaction.commit();

      return res.status(200).send({
        debitRecord, creditRecord
      });

    } catch(err) {
      await dbTransaction.rollback();
      res.status(400).send(err.message);
    }

  }),

};
