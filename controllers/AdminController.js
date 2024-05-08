const BalanceService = require('../services/Admin/BalanceService');

class AdminController {
  /**
   * @param {object} request
   * @param {object} response
   * @returns {object}
   */
  async getAllUsersBalance(request, response) {
    const serviceResponse = await BalanceService.getAllUsersBalance();

    response.status(serviceResponse.statusCode).send(serviceResponse);
  };

  /**
   * @param {object} request
   * @param {object} response
   * @returns {object}
   */
  async getUserBalanceById(request, response) {
    const serviceResponse = await BalanceService.getUserBalanceById(request);

    response.status(serviceResponse.statusCode).send(serviceResponse);
  };

  /**
   * @param {object} request
   * @param {object} response
   * @returns {object}
   */
  async addBalanceToUser(request, response) {
    const serviceResponse = await BalanceService.addBalanceToUser(request);

    response.status(serviceResponse.statusCode).send(serviceResponse);
  };

  /**
   * @param {object} request
   * @param {object} response
   * @returns {object}
   */
  async getBalanceAtTime(request, response) {
    const serviceResponse = await BalanceService.getBalanceAtTime(request);

    response.status(serviceResponse.statusCode).send(serviceResponse);
  };
}

module.exports = new AdminController();
