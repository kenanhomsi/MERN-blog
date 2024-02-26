import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
const app =express();
dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=> console.log('mongoDB is connected'));

app.use('/api/user' , userRoutes);
app.listen(3000,()=>{
  console.log('server is listen in port 3000 //');  
})
