const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
  } catch (err) {
    console.log('An error occured while connecting to the DB', err);
  }
};

module.exports = dbConnection;
