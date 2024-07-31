const userRepository = require('../../repositories/user');
const transactionRepository = require('../../repositories/transaction');
const RequestResponseService = require('../RequestResponseService');
const uuidGenerator = require('../../utils/uuidGenerator');
const tryCatchProxy = require('../../utils/tryCatchProxy');

class BalanceService {
    /**
     * @returns {object}
     */
    async getAllUsersBalance() {
        const usersBalance = await userRepository.getUsers(
            {},
            { user_name: 1, balance: 1, user_id: 1, _id: 0 }
        );
    
        return RequestResponseService.getResponse(true, 200, usersBalance);
    };

    /**
     * @param {object} request
     * @returns {object}
     */
    async getUserBalanceById(request) {
        const user = await userRepository.getUser(
            { user_id: request.params.id },
            { user_name: 1, balance: 1, user_id: 1, _id: 0 }
        );

        if (!user) {
            return RequestResponseService.getResponse('User not found!', 404);
        }

        return RequestResponseService.getResponse(true, 200, user);
    };

    /**
     * @param {object} request
     * @returns {object}
     */
    async addBalanceToUser(request) {
        const { user, params: { id }, body: { credit } } = request;

        const targetUser = await userRepository.updateUser(
            { user_id: id },
            { $inc:
                { balance: credit }
            },
            { new: true }
        );

        if (!targetUser) {
            return RequestResponseService.getResponse('User not found!', 404);
        }

        await transactionRepository.createTransaction({
            transaction_id: uuidGenerator(),
            from_balance: user.balance,
            to_balance: targetUser.balance,
            from: user._id,
            to: targetUser._id,
            transaction_amount: credit,
            transaction_date: Date.now(),
        });

        return RequestResponseService.getResponse(true, 200, targetUser);
    };

    /**
     * @param {object} request
     * @returns {object}
     */
    async getBalanceAtTime(request) {
        const { body: { user_name, date_time } } = request;

        const targetUser = await userRepository.getUser(
            { user_name }
        );

        if (!targetUser) {
            return RequestResponseService.getResponse('User not found!', 404);
        }

        const targetDateTime = new Date(date_time);

        const transactions = await transactionRepository.getTransactions(
            {
                $or: [
                    { from: targetUser._id },
                    { to: targetUser._id }
                ],
                transaction_date: { $lt: targetDateTime }
            },
            { transaction_date: -1 },
            1
        );

        if (!transactions.length) {
            return RequestResponseService.getResponse('No transactions found!', 404);
        }

        const balance = String(transactions[0].from) === String(targetUser._id)
            ? transactions[0].from_balance
            : transactions[0].to_balance;

        return RequestResponseService.getResponse(true, 200, { balance });
    };
};

module.exports = new (tryCatchProxy(BalanceService))();
