const {currencies, charge, exchange} = require('../controllers');

module.exports = (app) => {

  app.get('/api', (req, res) => res.status(200).send({
    message: 'Welcome to the Currency Exchange API!',
  }));

  // Get info about all currencies
  app.get('/api/currencies', currencies.list);

  // Create currency
  app.post('/api/currencies', currencies.createValidation, currencies.create);

  // Get info about currency. For example: /api/currencies/usd
  app.get('/api/currencies/:currency', currencies.retrieve);

  // Update currency
  app.put('/api/currencies/:currency', currencies.updateValidation, currencies.update);

  // Remove currency
  app.delete('/api/currencies/:currency', currencies.destroy);

  // Transfer money to debit account
  app.post('/api/charge', charge.validation, charge.up);

  // Exchange currencies
  app.post('/api/exchange/:buyCurrency/to/:sellCurrency', (req,res)=>{});

};
