import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import postRoutes from './routes/post.route.js'
import commentRoutes from './routes/comment.route.js'
import path from 'path';
const app =express();
dotenv.config();
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO)
.then(()=> console.log('mongoDB is connected'));

const __dirname=path.resolve();
app.listen(3000,()=>{
  console.log('server is listen in port 3000 //');  
})

app.use('/api/auth',authRoutes);
app.use('/api/user' , userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
   res.sendFile(path.join(__dirname,'client','dist','index.html'))
})

app.use((err,req,res,next)=>{

  const statusCode =err.statusCode || 500;
  
  const message = err.message || 'internal server error';
  
  res.status(statusCode).json({
    success:false,
    statusCode,
    message
  })
  
})
