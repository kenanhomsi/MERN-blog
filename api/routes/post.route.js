import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost } from "../controllers/post.controller.js";
const routes=express.Router();



routes.post('/create',verifyToken,createPost);

export default routes;