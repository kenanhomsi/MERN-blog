import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs';
export const signup=async (req,res)=>{
   const {username ,email ,password}=req.body;
   
   if( !username || !email || !password || username ==='' || email ==='' || password ==='' ){
    return res.status(400).json({message:'All fileds are require'});
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
    res.status(500).json({message:err.message})
   }

}