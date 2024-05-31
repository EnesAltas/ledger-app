const userRepository = require('../../repositories/user');
const transactionRepository = require('../../repositories/transaction');
const RequestResponseService = require('../RequestResponseService');
const uuidGenerator = require('../../utils/uuidGenerator');
const tryCatchProxy = require('../../utils/tryCatchProxy');

class UserService {
    /**
     * @param {object} request
     * @returns {object}
     */
    async getBalance(request) {
        const { user } = request;

        return RequestResponseService.getResponse(true, 200, { balance: user.balance });
    };

    /**
     * @param {object} request
     * @returns {object}
     */
    async transfer(request) {
        const { user, body: { amount, recipient } } = request;

        if (user.balance < amount) {
            return RequestResponseService.getResponse('Insufficient balance!', 400);
        }

        const recipientUser = await userRepository.getUser(
            { user_name: recipient }
        );

        if (!recipientUser) {
            return RequestResponseService.getResponse('Recipient not found!', 404);
        }

        if (recipientUser.user_name === user.user_name) {
            return RequestResponseService.getResponse('Cannot transfer to yourself!', 400);
        }

        user.balance -= amount;
        recipientUser.balance += amount;

        await user.save();
        await recipientUser.save();

        await transactionRepository.createTransaction({
            transaction_id: uuidGenerator(),
            from_balance: user.balance,
            to_balance: recipientUser.balance,
            from: user._id,
            to: recipientUser._id,
            transaction_amount: amount,
            transaction_date: Date.now(),
        });

        return RequestResponseService.getResponse('Transfer success!', 200);
    };
};

module.exports = new (tryCatchProxy(UserService))();
