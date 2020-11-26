require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@cluster0.hr6b8.mongodb.net/thalesEmployeeDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
});

module.exports = mongoose
