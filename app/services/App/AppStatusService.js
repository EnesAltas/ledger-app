const RequestResponseService = require('../RequestResponseService');
const tryCatchProxy = require('../../utils/tryCatchProxy');

class AppStatusService {
    /**
     * @returns {object}
     */
    getStatus() {
        return RequestResponseService.getResponse('Server is running', 200);
    };
};

module.exports =  new (tryCatchProxy(AppStatusService))();
