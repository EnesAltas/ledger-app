const mongoose = require('mongoose');

/**
 * @returns {Promise<void>}
 */
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${ process.env.MONGO_IP }:${ process.env.MONGO_PORT }/${ process.env.MONGO_DB_NAME }`);

    console.log('Database connected successfully');
  } catch (error) {
    console.error('Database connection error:', error);
  };
};

module.exports = connectDB;
