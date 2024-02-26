import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app =express();
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=> console.log('mongoDB is connected'));

app.listen(3000,()=>{
  console.log('server is listen in port 3000 //');  
})