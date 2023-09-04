import express from 'express';
import reciepieModel from '../Models/reciepieModel.js';
import userModel from '../Models/userModel.js';
import { validate } from './userRoute.js';
const route = express.Router();
route.get('/',async(req,res)=>{
    try{
     const allRecipies = await reciepieModel.find({});
     return res.status(200).json({"recipies":allRecipies});
    }catch(error){
      console.error("error : "+error)
    } 
});
route.post('/' ,validate,async(req,res)=>{
    try{
      const newRecipie = new reciepieModel(req.body);
       await newRecipie.save();
       return res.status(201).json({"recipepie":newRecipie}) 
    }catch(error){
      console.error("error : "+error)
    } 
});
route.put('/save', validate ,async(req,res)=>{
    const {userId , recipieId} = req.body;
    try{
        const user = await userModel.findById(userId);
        const recipie = await reciepieModel.findById(recipieId);
        if(!user){
            return res.status(404).json({"message":"user not found"});
        } 
        user.saveRecipies.push(recipie._id);
       await user.save();
       return res.status(200).json({"savrecipiesIds":user.saveRecipies});
    }catch(error){
      console.error("error : "+error)
    } 
});
route.get('/saveRecipies/ids/:userId',async(req,res)=>{
    const {userId} = req.params;
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({"message":"user not found"});
        } 
       return res.status(200).json({"saveRecipies":user.saveRecipies});
    }catch(error){
      console.error("error : "+error)
    } 
});

route.get('/saveRecipies/:userId',async(req,res)=>{
    const {userId} = req.params;
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({"message":"user not found"});
        } 
        const savedRecipies = await reciepieModel.find({
            _id:{$in:user.saveRecipies}
        })
        res.status(200).json({"saveRecipies":savedRecipies})
    }catch(error){
      console.error("error : "+error)
    } 
});



export default route;