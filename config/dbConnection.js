const mongoose = require('mongoose')

const connectDb = async () => {
   try {
      const connect = await mongoose.connect(process.env.DB_URI)
      console.log('Connection with the database has been established', connect.connection.host, connect.connection.name)
   }
   catch(err){
      console.log(err)
      process.exit(1)
   }
}

module.exports = connectDb