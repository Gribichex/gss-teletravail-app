const mongoose = require("./init");
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  department: { type: String, required: true },
  nonWorkingDays: [
    {
      date: Object,
      status: Number,
    },
  ],
});

// Add passport middleware to User Schema
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email', // Use email, not the default 'username'
  usernameLowerCase: true, // Ensure that all emails are lowercase
  session: false // Disable sessions as we'll use JWTs
})


const User = mongoose.model("User", userSchema);

module.exports = User