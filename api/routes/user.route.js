import express from "express";
import {test , updateUser } from '../controllers/user.controller.js'
import { verifyToken } from "../utils/verifyUser.js";
const routes=express.Router();


routes.get('/test',test);
routes.put('/update/:userId', verifyToken  ,updateUser);
  
  export default routes;