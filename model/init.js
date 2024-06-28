require("dotenv").config();
const mongoose = require("mongoose");

// Determine the environment, defaulting to 'development' if NODE_ENV is not set
const env = process.env.NODE_ENV || 'development';

let dbName;

// Determine the database name based on the environment
switch(env) {
  case 'test':
    dbName = 'test_db';
    break;
  case 'production':
    dbName = 'prod_db';
    break;
  default:
    dbName = 'dev_db';
}
// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => console.log(`Connected to MongoDB (${process.env.NODE_ENV} environment)`))
  .catch((err) => console.error('Could not connect to MongoDB', err));

module.exports = mongoose;