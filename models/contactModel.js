const mongoose = require('mongoose')

const contactSchema = mongoose.Schema({
   user_id: {
      type: mongoose.Schema.ObjectId,
      required: true,
      ref: "User",
   },
   name: {
      type: String,
      required: [true, "Name is required"]
   },
   email: {
      type: String,
      required: [true, "Email is a required field"]
   },
   phone: {
      type: String,
      required: [true, "Phone numebr cannot be empty"]
   },

}, {
   timesStamps: true,
})

module.exports = mongoose.model('Contact', contactSchema)