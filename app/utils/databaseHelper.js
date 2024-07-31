const mongoose = require('mongoose');

/**
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    console.log(process.env.DB_URI);
    await mongoose.connect(process.env.DB_URI);

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  };
};

module.exports = connectDB;
