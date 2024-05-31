const userRepository = require('../repositories/user');

/**
 * @param {object} request
 * @param {object} response
 * @param {function} next
 * @returns {object}
 */
const checkPermission = async (request, response, next) => {
    try {
        const userId = request.session.user_id;

        if (!userId) {
            return response.status(401).json({ message: 'Login required!' });
        }

        const user = await userRepository.getUser(
            { user_id: userId }
        );

        if (!user || !user.is_admin) {
            return response.status(403).json({ message: 'Unauthorized!' });
        }

        request.user = user;

        next();
    } catch (error) {
        response.status(500).send(error);
    };
};

module.exports = checkPermission;
