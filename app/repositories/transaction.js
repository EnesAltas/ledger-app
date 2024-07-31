const Transaction = require('../models/database/transaction');
const tryCatchProxy = require('../utils/tryCatchProxy');

class TransactionRepository {
    /**
     * @param {object} transaction
     * @returns {object}
     */
    async createTransaction(transaction) {
        return await Transaction
            .create(transaction);
    };

    /**
     * @param {object} condition
     * @param {object} sort
     * @param {number} limit
     * @returns {object}
     */
    async getTransactions(condition, sort, limit) {
        return await Transaction
            .find(condition)
            .sort(sort)
            .limit(limit);
    };
};

module.exports = new (tryCatchProxy(TransactionRepository))();
