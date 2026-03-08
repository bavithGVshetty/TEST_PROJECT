const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET="mysecretkey";

// REGISTER
router.post("/register",async(req,res)=>{

  const {username,email,password}=req.body;

  const hashedPassword = await bcrypt.hash(password,10);

  const user = new User({
    username,
    email,
    password:hashedPassword
  });

  await user.save();

  res.json({message:"User Registered"});
});


// LOGIN
router.post("/login",async(req,res)=>{

  const {email,password}=req.body;

  const user = await User.findOne({email});

  if(!user){
    return res.status(400).json({message:"User not found"});
  }

  const isMatch = await bcrypt.compare(password,user.password);

  if(!isMatch){
    return res.status(400).json({message:"Invalid password"});
  }

  const token = jwt.sign(
    {id:user._id},
    SECRET,
    {expiresIn:"1h"}
  );

  res.json({token});
});

module.exports = router;