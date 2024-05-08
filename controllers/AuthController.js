const AuthService = require('../services/AuthService');

class AuthController {
  /**
   * @param {object} request
   * @param {object} response
   * @returns {object}
   */
  async login(request, response) {
    const serviceResponse = await AuthService.login(request);

    response.status(serviceResponse.statusCode).send(serviceResponse);
  };

  /**
   * @param {object} request
   * @param {object} response
   * @returns {object}
   */
  async register(request, response) {
    const serviceResponse = await AuthService.register(request);

    response.status(serviceResponse.statusCode).send(serviceResponse);
  };
};

module.exports = new AuthController();
