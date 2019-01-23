const {validationResult} = require('express-validator/check');

// Handling controller errors
module.exports = middleware => {
  return async (req, res, next) => {
    try {

      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({
          success: false,
          errors: errors.array()
        });
      }

      await middleware(req, res, next);
    } catch (err) {
      res.status(400).send(err);
    }
  };
};
