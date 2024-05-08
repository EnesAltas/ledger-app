const { validationResult } = require('express-validator');

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @returns {object}
 */
const validatorMiddleware = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
};

module.exports = validatorMiddleware;
