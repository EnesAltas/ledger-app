const User = require('../models/database/user');

/**
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @returns {object}
 */
const checkUserLoggedIn = async (request, response, next) => {
    try {
        const userId = request.session.user_id;

        if (!userId) {
            return response.status(401).json({ message: 'Login required!' });
        }

        const user = await User.findOne({ user_id: userId });

        if (!user) {
            return response.status(404).json({ message: 'User not found!' });
        }

        request.user = user;

        next();
    } catch (error) {
        response.status(500).send
    };
};

module.exports = checkUserLoggedIn;
