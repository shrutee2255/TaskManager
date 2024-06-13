const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {  BadRequestError,UnauthenticatedError}= require('../errors')

// Bcrypt is a valuable tool to use to hash and store passwords.Its major benefits include: Slow runtime. 
// Bcrypt is a slow-functioning algorithm that takes time to create password hashes and requires time to decrypt them,
//   significantly slowing hacker attempts to break the bcrypt hash.



const register = async (req,res)=>{
    
 const user= await User.create({ ...req.body})
 const token = user.createJWT()
 res.status(StatusCodes.CREATED).json({user:{name:user.name} , token })
}


const login = async (req,res)=>{
  const {email,password}= req.body

  if(!email||!password){
    throw new BadRequestError('Please provide email and password')
  }


  const user = await User.findOne({email})
  //compare password
  if(!user){
  throw new UnauthenticatedError('Invalid credentials')

  }
const isPasswordCorrect = await user.comparePassword(password)
if(!isPasswordCorrect){
    throw new UnauthenticatedError('Invalid credentials')
  
    }

  const token=user.createJWT();
  res.status(StatusCodes.OK).json({ user:{name:user.name},token})
}

module.exports = {
    register,login
}