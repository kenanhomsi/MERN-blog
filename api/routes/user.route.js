import express from "express";
import {test , updateUser ,deleteUser,signout,getUsers,getSingleUser} from '../controllers/user.controller.js'
import { verifyToken } from "../utils/verifyUser.js";
const routes=express.Router();


routes.get('/test',test);
routes.get('/getusers',verifyToken,getUsers);
routes.put('/update/:userId', verifyToken  ,updateUser);
routes.delete('/delete/:userId', verifyToken  ,deleteUser);
routes.post('/signout',signout);
routes.get('/:userId',getSingleUser);
  
  export default routes;