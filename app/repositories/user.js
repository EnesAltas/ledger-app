const User = require('../models/database/user');
const tryCatchProxy = require('../utils/tryCatchProxy');

class UserRepository {
    /**
     * @param {object} user
     * @returns {object}
     */
    async createUser(user) {
        return await User.create(user);
    };

    /**
     * @param {object} condition
     * @param {object} projection
     * @returns {object}
     */
    async getUsers(condition, projection) {
        return await User.find(condition, projection);
    };

    /**
     * @param {object} condition
     * @param {object} projection
     * @returns {object}
     */
    async getUser(condition, projection) {
        return await User.findOne(condition, projection);
    };

    /**
     * @param {object} user
     * @returns {object}
     */
    async updateUser(condition, update, options) {
        return await User.findOneAndUpdate(condition, update, options);
    };
}

module.exports = new (tryCatchProxy(UserRepository))();
