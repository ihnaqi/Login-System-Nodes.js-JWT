const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
   username: {
      type: String,
      required: [true, "Username field is required field"]
   },
   email: {
      type: String,
      required: [true, "Email is a required field"],
      unique: [true, "Email has been taken"]
   },
   password: {
      type: String,
      required: [true, "Password is required field"]
   }
}, {
   timestamps: true,
})

module.exports = mongoose.model("User", userSchema)