/**
 * @param {object} request
 * @param {object} response
 */
const notFoundHandler = (request, response) => {
  response.status(404).json({ message: 'Not Found!', status: 404 });
};

/**
 * @param {object} err
 * @param {object} request
 * @param {object} response
 * @param {object} next
 */
const jsonErrorHandler = (err, request, response, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return response.status(418).json({ message: 'Invalid JSON' });
  }

  next();
};

module.exports = {
  notFoundHandler,
  jsonErrorHandler
};
