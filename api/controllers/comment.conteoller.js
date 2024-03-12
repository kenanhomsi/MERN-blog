import Comment from "../models/comment.model.js"
import { errorHandler } from "../utils/error.js";
export const createComment= async(req,res,next)=>{
    try{
        const {content,postId,userId}=req.body;
        if(userId !== req.user.id){
            next(errorHandler(403,'you are not allowed to create this comment'))
        }
        const newComment = new Comment({
            content,
            postId,
            userId
        })
        await newComment.save();
        res.status(200).json(newComment);
    }catch(err){
        next(err);
    }
    
}