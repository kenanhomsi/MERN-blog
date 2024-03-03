import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup=async (req,res,next)=>{
   const {username ,email ,password}=req.body;
   
   if( !username || !email || !password || username ==='' || email ==='' || password ==='' ){
    next(errorHandler(400,'All fileds are require'))
    // return res.status(400).json({message:'All fileds are require'});
   }

   const hashedPass= bcryptjs.hashSync(password ,10)
   const newUser =new User({
    username,
    email,
    password:hashedPass
   })
   try{
    await newUser.save();

    res.json({success:'true'})
   }catch(err){
     next(err);
   }

}

export const signin = async (req,res,next)=>{
  const {email ,password}= req.body;

  if(!email || !password || email=='' || password==''){
    return next(errorHandler(400,'All fields are required '))
  }
  try{
    const ValidUser= await User.findOne({email});
    if(!ValidUser){
     return next(errorHandler(404,'User not found'))
    }
    const ValidPassword= bcryptjs.compareSync(password,ValidUser.password);
    if(!ValidPassword){
       return next(errorHandler(400,'invalid password'));
    }
    const token= jwt.sign({id:ValidUser._id} ,process.env.JWT_SECRET);
    const {password:pass , ...rest}=ValidUser._doc;
    res.status(200).cookie('access_token',token,{httpOnly:true}).json(rest);
  }catch(err){
    next(err);
  }
}

export const google= async (req,res,next)=>{
  const {name ,email, googlePhotoUrl}=req.body;
  try{
    const user= await User.findOne({email});
    if(user){
      const token= jwt.sign({id:user._id},process.env.JWT_SECRET);
      const {password,...rest}=user._doc;
      res.status(200).cookie('access_token',token,{
        httpOnly:true
      }).json(rest);
    }else{
      const generatedPassword= Math.random().toString(36).slice(-8) +  Math.random().toString(36).slice(-8);
      const hashedPass = bcryptjs.hashSync(generatedPassword,10);
      const newUser= await User({
        username: name.tolowerCase().split(' ').join('') + Math.random().toString(9).slice(-3),
        email,
        password:hashedPass,
        profilePicture:googlePhotoUrl
      })
      await newUser.save();
      const token= jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      const {password,...rest}=newUser._doc;
      res.status(200).cookie('access_token',token,{
        httpOnly:true
      }).json(rest);
    }

  }catch(err){
    next(err);
  }

}