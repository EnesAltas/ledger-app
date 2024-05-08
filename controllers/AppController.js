const AppStatusService = require('../services/App/AppStatusService');

class AppController {
  /**
   * @param {object} request
   * @param {object} response
   * @returns {object}
   */
  async getStatus(request, response) {
    const serviceResponse = await AppStatusService.getStatus();

    response.status(serviceResponse.statusCode).send(serviceResponse);
  };
};

module.exports = new AppController();
