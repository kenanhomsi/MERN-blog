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
export const getPostComments=async (req,res,next)=>{
    const {postId}=req.params;
    try{
        const postcomments= await Comment.find({postId}).sort({createdAt:-1})
        res.status(200).json(postcomments);
    }catch(err){
        next(err);
    }
}
export const likeComment=async(req,res,next)=>{
    try{
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404,'comment not found'));
        }
        const userIndex=comment.likes.indexOf(req.user.id);
        if(userIndex=== -1){
            comment.numberOfLikes ++;
            comment.likes.push(req.user.id)
        }else{
            comment.numberOfLikes --;
            comment.likes.splice(userIndex,1);
        }
        await comment.save();
        res.status(200).json(comment);
    }catch(err){
        next(err);
    }
}
export const editeComment=async(req,res,next)=>{
    try{
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(404,'comment not found'));
        }
        if(comment.userId !== req.user.id && !req.user.isAdmin){
            return next(errorHandler(403,'you are not allowed to edite this comment'));
        }

        const editedComment=await Comment.findByIdAndUpdate(
            req.params.commentId,
            {content:req.body.content},
            {new:true}
        );
        res.status(200).json(editedComment);

    }catch(err){
        next(err);
    }
}
export const deleteComment=async(req,res,next)=>{
    try{
        const comment=await Comment.findById(req.params.commentId);
        if(!comment){
            return next(errorHandler(403,'comment ont found'));
        }
        if(req.user.id !== comment._id && !req.user.isAdmin){
            return next(errorHandler(404,'you are not allowed to delete this comment'));
        }
        await Comment.findByIdAndDelete(req.params.commentId);
        res.status(200).json('comment has been deleted');
    }catch(err){
        next(err);
    }
}
export const getComments=async(req,res,next)=>{
    try{
        if(!req.user.isAdmin){
            return next(errorHandler(403,'Unauthorized'));
        }
            const startIndex=parseInt(req.query.startIndex) || 0;
            const limit=parseInt(req.query.limit) || 9;
            const sortDirection=req.query.order === 'desc' ? -1 : 1;
            
            const Allcomments=await Comment.find().sort({updatedAt:sortDirection}).skip(startIndex).limit(limit);

            const TotalComments = await Comment.countDocuments();

            const now=new Date();
            const lastMonuth=new Date(now.getFullYear(),now.getMonth() -1 ,now.getDate());
            const CommentsOfLastMount=await Comment.countDocuments({createdAt:{$gte:lastMonuth}})
            
            res.status(200).json({comments: Allcomments,TotalComments,CommentsOfLastMount});
        
    }catch(err){
        next(err);
    }
}