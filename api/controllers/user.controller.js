import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs'
import User from '../models/user.model.js'
export const  test = (req,res)=>{
    res.send('hello world')
  }

export const updateUser= async(req,res,next)=>{
  if(req.user.id !=req.params.userId){
    return next(errorHandler(403,'your are not allowed to update this user'));
  }
  if(req.body.password){
    if(req.body.password.length < 6){
       return next(errorHandler(400,'password most be 6 characters and more'))
    }
    req.body.password=bcryptjs.hashSync(req.body.password,10);
  }
  if(req.body.username){
    if(req.body.username.length < 7 || req.body.username.length >  20){
      return next(errorHandler(400,'userName  must be between 7 and 20 characters'));
    }
    if(req.body.username.includes(' ')){
      return next(errorHandler(400,'userName connet containe a spaces '));
    }
    if(req.body.username !== req.body.username.toLowerCase()){
      return next(errorHandler(400,'userName must be in lower case '));
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
      return next(errorHandler(400,'userName connet containe letters and numbers '));
    }
    
  }
  try{
    const updateUser=await User.findByIdAndUpdate(req.params.userId,{
      $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        profilePicture:req.body.profilePicture
      }
    },{new:true})
    const {password ,...rest}=updateUser._doc;
    res.status(200).json(rest);
  }catch(err){
    next(err)
  }

}
export const deleteUser= async(req,res,next)=>{
  if(!req.user.isAdmin && req.user.id != req.params.userId){
    return next(errorHandler(403,'your are not allowed to update this user'));
  }
  try{
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  }catch(err){
    next(err)
  }
}
export const signout = (req,res,next)=>{
  try{
    res.clearCookie('access_token').status(200).json('User has been signout')
  }catch(err){
    next(err);
  }

}
export const getUsers=async(req,res,next)=>{
  if(!req.user.isAdmin){
    return next(errorHandler(403,'you are not allowed to see this users'));
  }
  try{
    const startIndex=parseInt(req.query.startIndex) || 0;
    const limit=req.query.limit || 9;
    const sortDirection= req.query.order ==='asc'? 1 : -1;
    const users=await User.find()
    .sort({createdAt : sortDirection})
    .skip(startIndex)
    .limit(limit);
    const usersWithoutPass=users.map((user)=>{
      const {password ,...rest}=user._doc;
      return rest;
    })
    const totalusers=await User.countDocuments();
    const now=new Date();

    const oneMouthago=new Date(
      now.getFullYear(),
      now.getMonth() -1,
      now.getDate()
    )
      const lastMouthUsers=await User.countDocuments({
        createdAt:{$gte:oneMouthago},
      })
      res.status(200).json({
        users:usersWithoutPass,
        totalusers,
        lastMouthUsers
      });
  }catch(err){
      next(err);

  }
}