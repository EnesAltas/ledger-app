const { check } = require('express-validator');

const transferRules = [
    check('amount').notEmpty().withMessage('Amount is required'),
    check('recipient').notEmpty().withMessage('Recipient is required')
];

module.exports = {
    transferRules
};
