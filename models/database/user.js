const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  user_id: String,
  user_name: String,
  password: String,
  balance: {
    type: Number,
    default: 0 
  },
  is_admin: {
    type: Boolean, 
    default: false
  },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
