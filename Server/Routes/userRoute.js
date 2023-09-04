export const validate = (req,res,next)=>{
  const token = req.headers.authorization;
  if(!token){
    return res.status(401).json({"message":"unauthorized access"});
  }
  jwt.verify(token,"secret",(err)=>{
    if(err){
      return res.status(403).json({"message":"token is invalid"});
    }
    next();
  })
}

import express from 'express';
import User from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';

const route = express.Router();



route.post('/',(req,res)=>{
res.send("hi");
});

route.post('/register',async(req,res)=>{
  const {username,password}= req.body;
  try{
     const existingUser =  await User.findOne({username:username});
     if(existingUser){
        return res.status(400).json({"message":"user already exist"});
     }
      
     const hashPassword = await bcrypt.hash(password,10);
     const newUser =  new User({username,password:hashPassword});
      await newUser.save(); 
     return res.status(201).json({"message":"User created successfully","user":newUser})
  }catch(error){
    console.log("error "+ error)
  }
})

route.post('/login',async(req,res)=>{
  const {username,password}= req.body;
  try{
  const user = await User.findOne({username});
  if(!user) {
    return res.status(404).json({"message":"User not found"});
  }
  const isValidPassword = await bcrypt.compare(password,user.password);
  if(!isValidPassword){
   return res.status(400).json({"message":"username or password is invalid"});
  }

  const token = jwt.sign({"id":user._id},"secret");
   return res.status(200).json({"id":user._id,"token":token}); 

  }catch(error){
   console.log("error : " +error);
  }

})
route.put('/edit/:userId',validate,async(req,res)=>{
  const {userId} = req.params;
  const {oldPassword, newUserName, newPassword} = req.body;
  try{
     const user = await User.findById(userId);
     if(!user){
      return res.status(404).json({"message":"User not found"});
     }
     const isValidPassword = await bcrypt.compare(oldPassword,user.password);
  if(!isValidPassword){
   return res.status(400).json({"message":"username or password is invalid"});
  }
  if(newUserName ===''){
    return res.status(403).json({"message":"must provide username"});
  }

  const hashPassword = await bcrypt.hash(newPassword,10);
     user.username = newUserName;
     user.password = hashPassword;
     await user.save();
     return res.status(200).json({"message":"Profile update successfully."})
    }catch(error){
     console.log("error : " +error);
    }
})




export default route;
