const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//@desc Register a user
//@router POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
   const {username, email, password} = req.body

   if(!username || !email || !password) {
      res.status(400)
      throw new Error("All fields are required")
   }
   const userAvailable = await User.findOne({email: email})

   if(userAvailable) {
      res.status(400)
      throw new Error("User already registered")
   }

   const hashedPassword = await bcrypt.hash(password, 10)

   const user = User.create({
      username,
      email,
      password: hashedPassword
   })

   if(user) {
      res.status(201).json({
         message: "User registered successfully",
         _id: user.id,
         username: user.username,
         email: user.email,
      })
   }
   else {
      res.status(400)
      throw new Error("Error Ocurred while creating user")
   }

})

//@desc Let the user login
//@router POST /api/user/login
//@access private
const loginUser = asyncHandler(async (req, res) => {
   const {email, password} = req.body

   if(!email || !password) {
      res.status(400)
      throw new Error("All Fields are required")
   }

   const user = await User.findOne({email})

   if (user && (await bcrypt.compare(password, user.password))) {

      const accessToken = jwt.sign({
         user: {
            username: user.username,
            email: user.email,
            id: user.id
         },
      }, process.env.ACCESS_TOKEN,
      {expiresIn: "30m"})

      res.status(200).json({
         accessToken
      })
   }
   else {
      res.status(401)
      throw new Error("Password is not valid")
   }
})

//@desc get current logged in user
//@router GET /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
   res.json(req.user)
})

module.exports = {registerUser, loginUser, currentUser}