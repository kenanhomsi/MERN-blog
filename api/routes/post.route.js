import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { createPost,getPosts ,deletePost,updatePost} from "../controllers/post.controller.js";
const routes=express.Router();


routes.get('/getposts',getPosts);
routes.post('/create',verifyToken,createPost);
routes.delete('/deletepost/:postId/:userId',verifyToken,deletePost)
routes.put('/updatepost/:postId/:userId',verifyToken,updatePost)
export default routes;