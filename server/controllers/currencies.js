const Currency = require('../models').Currency;

const errorHandler = require('../lib/errorHandler');

const {check} = require('express-validator/check');
const {sanitizeBody } = require('express-validator/filter');

module.exports = {

  createValidation: [
    sanitizeBody('code').trim().customSanitizer(v => v.toUpperCase()),
    check('code').custom(v => v.length === 3),
    check('canBuy').isBoolean(),
    check('canSell').isBoolean(),
    check('rate').isFloat(),
    check('maxSalePrice').isFloat(),
    check('minSalePrice').isFloat(),
    check('maxBuyPrice').isFloat(),
    check('minBuyPrice').isFloat(),
  ],

  updateValidation: [
    check('canBuy').optional().isBoolean(),
    check('canSell').optional().isBoolean(),
    check('rate').optional().isFloat(),
    check('maxSalePrice').optional().isFloat(),
    check('minSalePrice').optional().isFloat(),
    check('maxBuyPrice').optional().isFloat(),
    check('minBuyPrice').optional().isFloat(),
  ],

  create: errorHandler(async (req, res) => {

    const currency = await Currency.create({
        code: req.body.code,
        canBuy: (req.body.canBuy === 'true' || req.body.canBuy === 1 ),
        canSell: (req.body.canSell === 'true' || req.body.canSell === 1 ),
        rate: parseFloat(req.body.rate),
        maxSalePrice: parseFloat(req.body.maxSalePrice),
        minSalePrice: parseFloat(req.body.minSalePrice),
        maxBuyPrice: parseFloat(req.body.maxBuyPrice),
        minBuyPrice: parseFloat(req.body.minBuyPrice),
      });

    return res.status(201).send(currency);

  }),

  list: errorHandler(async (req, res) => {

    const currencies = await Currency.findAll();

    return res.status(200).send(currencies);

  }),

  retrieve: errorHandler(async (req, res) => {

    const currency = await Currency.findOne({ where: {code: req.params.currency.toUpperCase()} });

    if (!currency) {
      return res.status(400).send({
        message: 'Currency Not Found',
      });
    }

    return res.status(200).send(currency);

  }),

  update: errorHandler(async (req, res) => {

    const currency = await Currency.findOne({ where: {code: req.params.currency.toUpperCase()} });

    if (!currency) {
      return res.status(400).send({
        message: 'Currency Not Found',
      });
    }

    const updatedCurrency = await currency.update({
      canBuy: req.body.canBuy ? (req.body.canBuy === 'true' || req.body.canBuy === 1 ) : currency.canBuy,
      canSell: req.body.canSell ? (req.body.canSell === 'true' || req.body.canSell === 1 ) : currency.canSell,
      rate: req.body.rate ? parseFloat(req.body.rate) : currency.rate,
      maxSalePrice: req.body.maxSalePrice ? parseFloat(req.body.maxSalePrice) : currency.maxSalePrice,
      minSalePrice: req.body.minSalePrice ? parseFloat(req.body.minSalePrice) : currency.minSalePrice,
      maxBuyPrice: req.body.maxBuyPrice ? parseFloat(req.body.maxBuyPrice) : currency.maxBuyPrice,
      minBuyPrice: req.body.minBuyPrice ? parseFloat(req.body.minBuyPrice) : currency.minBuyPrice,
    });

    return res.status(200).send(updatedCurrency);

  }),

  destroy: errorHandler(async (req, res) => {

    const currency = await Currency.findOne({ where: {code: req.params.currency.toUpperCase()} });

    if (!currency) {
      return res.status(400).send({
        message: 'Currency Not Found',
      });
    }

    await currency.destroy();

    return res.status(204).send();

  }),

};
