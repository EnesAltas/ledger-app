class RequestResponseService {
    /**
     * @param {string} message
     * @param {number} statusCode
     * @param {object} data
     * @returns {object}
     */
    static getResponse (message, statusCode, data) {
        return {
            statusCode,
            message,
            data,
        };
    };
};

module.exports = RequestResponseService;
