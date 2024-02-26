import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
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

    res.json({message:'all done'})
   }catch(err){
     next(err);
   }

}