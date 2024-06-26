const { validationResult } = require('express-validator');

/**
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @returns {object}
 */
const validatorMiddleware = (request, response, next) => {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = validatorMiddleware;
