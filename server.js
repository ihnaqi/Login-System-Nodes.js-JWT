const express = require('express')
const connectDB = require('./config/dbConnection')
const errorHandler = require('./middlewares/errorHandler')
const dotenv = require('dotenv').config()

connectDB()
const PORT = process.env.PORT

const app = express()
// This is body parser will make sure that the data being dealt with is in JSON form
app.use(express.json())
app.use('/api/contact', require('./routes/contactRoutes'))
app.use('/api/user', require('./routes/userRoutes'))
app.use(errorHandler)

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})