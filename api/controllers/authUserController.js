import { response } from 'express'
import asyncHandler from 'express-async-handler'
import Hero from '../models/heroModel.js'
import generateToken from '../utils/generateTokens.js'
import cors from 'cors'

// @desc Auth user & get token
// @route GET /api/v1/user/login
// @access Public
// const loginUser = asyncHandler(async (req, res) => {
//   const { email, password } = req.body

//   const user = await Hero.findOne({ email })

//   if(user.password == password) {
//     res.json({
//       _id: user._id,
//       firstname: user.firstname,
//       lastname: user.lastname,
//       email: user.email,
//       amount: user.amount,
//       currency: user.currency,
//       isPaid: user.isPaid,
//       voulcherNum: user.voulcherNum,
//       reciever: user.reciever,
//       sendAmount: user.sendAmount,
//       recieveAmount: user.recieveAmount,
//       recieveMethod: user.recieveMethod,
//       transationDate: user.transationDate,
//       pickupDate: user.pickupDate,
//       taskCode: user.taskCode,
//       referenceNum: user.referenceNum,
//       isAdmin: user.isAdmin,
//       transactions: user.transactions,
//       cardDetails: user.cardDetails,
//       messages: user.messages,
//       passport: user.passport,
//       password: user.password,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(401).json({ message: 'Invalid email or password' })
//   }
// })



// @desc Register new hero
// @route GET /api/v1/register
// @access Public
const registerHero = asyncHandler(async (req, res) => {

  const hero = await Hero.create(req.body)

  if (hero) {
    res.status(201).json({
      name: hero.name,
      twitter: hero.twitter,
      instagram: hero.instagram,
      bgimage: hero.bgimage,
      previmage: hero.previmage,
      image: hero.image,
      isAdmin: hero.isAdmin,
      password: hero.password,
      token: generateToken(hero._id),
    })
  } else {
    res.status(400).json({ message: 'Invalid user data' })
  }
})

// @desc Fetch all users
// @route GET /api/v1/users
// @access Public
const getUsers = asyncHandler(async (req, res) => {
  const hero = await Hero.find({}).populate('users').exec()

  res.json(hero)
})

// @desc Fetch single user
// @route GET /api/v1/users/:id
// @access Public
const getUsersById = asyncHandler(async (req, res) => {
  const hero = await Hero.findById(req.params.id).populate('users').exec()

  console.log(hero)

  if (hero) {
    res.json(hero)
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})


export {
  // loginUser,
  registerHero,
  getUsers,
  getUsersById,
}
