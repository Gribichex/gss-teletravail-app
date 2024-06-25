require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://"+process.env.DB_USER+":"+process.env.DB_PASSWORD+"@cluster0.kq2cucd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex:true
});

module.exports = mongoose
