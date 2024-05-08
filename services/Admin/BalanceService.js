const User = require('../../models/database/user');
const Transaction = require('../../models/database/transaction');
const RequestResponseService = require('../RequestResponseService');
const uuidGenerator = require('../../utils/uuidGenerator');
const tryCatchProxy = require('../../utils/tryCatchProxy');

class BalanceService {
    /**
     * @returns {object}
     */
    async getAllUsersBalance() {
        const usersBalance = await User.find(
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
        const user = await User.findOne(
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

        const targetUser = await User.findOneAndUpdate(
            { user_id: id },
            { $inc:
                { balance: credit }
            },
            { new: true }
        );

        if (!targetUser) {
            return RequestResponseService.getResponse('User not found!', 404);
        }

        const newTransaction = new Transaction({
            transaction_id: uuidGenerator(),
            from_balance: user.balance,
            to_balance: targetUser.balance,
            from: user._id,
            to: targetUser._id,
            transaction_amount: credit,
            transaction_date: Date.now(),
        });

        await newTransaction.save();

        return RequestResponseService.getResponse(true, 200, targetUser);
    };

    /**
     * @param {object} request
     * @returns {object}
     */
    async getBalanceAtTime(request) {
        const { body: { user_name, date_time } } = request;

        const targetUser = await User.findOne({ user_name: user_name });

        if (!targetUser) {
            return RequestResponseService.getResponse('User not found!', 404);
        }

        const targetDateTime = new Date(date_time);

        const transactions = await Transaction.find({
            $or: [
                { from: targetUser._id },
                { to: targetUser._id }
            ],
            transaction_date: { $lt: targetDateTime }
        }).sort({ transaction_date: -1 }).limit(1);

        if (transactions.length === 0) {
            return RequestResponseService.getResponse('No transactions found!', 404);
        }
        
        const balance = String(transactions[0].from) === String(targetUser._id)
            ? transactions[0].from_balance
            : transactions[0].to_balance;

        return RequestResponseService.getResponse(true, 200, { balance });
    };
};

module.exports = new (tryCatchProxy(BalanceService))();
