const User = require('../models/database/user');
const RequestResponseService = require('./RequestResponseService');
const tryCatchProxy = require('../utils/tryCatchProxy');
const uuidGenerator = require('../utils/uuidGenerator');
const { compareHashText, hashText } = require('../utils/hashHelper');

class AuthService {
    /**
     * @param {object} request
     * @returns {object}
     */
    async login(request) {
        const { user_name, password } = request.body;

        const user = await User.findOne({ user_name });

        if (!user) {
            return RequestResponseService.getResponse('Auth failed!', 404);
        }

        const isPasswordValid = compareHashText(password, user.password);

        if (!isPasswordValid) {
            return RequestResponseService.getResponse('Auth failed!', 404);
        }

        request.session.user_id = user.user_id;

        return RequestResponseService.getResponse(true, 200, user);
    };

    /**
     * @param {object} request
     * @returns {object}
     */
    async register(request) {
        const { user_name, password } = request.body;

        const user = await User.findOne({ user_name });

        if (user) {
            return RequestResponseService.getResponse('User already exists!', 404);
        }

        const newUser = new User({
            user_id: uuidGenerator(),
            user_name,
            password: hashText(password),
            balance: 0
        });

        await newUser.save();

        return RequestResponseService.getResponse(true, 201, newUser);
    };
};

module.exports =  new (tryCatchProxy(AuthService))();
