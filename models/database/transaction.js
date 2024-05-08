const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new mongoose.Schema({
    transaction_id: String,
    from_balance: Number,
    to_balance: Number,
    from: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    to: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    transaction_amount: Number,
    transaction_date: Date
});

const Transaction = mongoose.model('Transaction', TransactionSchema);

module.exports = Transaction;
