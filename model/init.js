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

// Construct the full MongoDB URI
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kq2cucd.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Cluster0`;

// Connect to MongoDB
mongoose.connect(dbURI)
  .then(() => console.log(`Connected to MongoDB (${env} environment)`))
  .catch((err) => console.error('Could not connect to MongoDB', err));

module.exports = mongoose;