const UserService = require("../services/User/UserService");

class UserController {
    /**
     * @param {object} request
     * @param {object} response
     * @returns {object}
     */
    async getBalance(request, response) {
        const serviceResponse = await UserService.getBalance(request);

        response.status(serviceResponse.statusCode).send(serviceResponse);
    };

    /**
     * @param {object} request
     * @param {object} response
     * @returns {object}
     */
    async transfer(request, response) {
        const serviceResponse = await UserService.transfer(request);

        response.status(serviceResponse.statusCode).send(serviceResponse);
    };
};

module.exports = new UserController();
