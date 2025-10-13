const mongoose = require('mongoose');

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.DB_URL);

    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDatabase;
