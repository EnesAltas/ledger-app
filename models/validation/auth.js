const { check } = require('express-validator');

const loginRules = [
    check('user_name').notEmpty().withMessage('Username is required'),
    check('password').notEmpty().withMessage('Password is required')
];

const registerRules = [
    check('user_name').notEmpty().withMessage('Username is required'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

module.exports = {
    loginRules,
    registerRules
};
