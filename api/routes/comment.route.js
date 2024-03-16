import express from 'express'
import { createComment ,getPostComments,likeComment,editeComment,deleteComment,getComments} from '../controllers/comment.conteoller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.get('/getComments',verifyToken,getComments);
router.put('/likeComment/:commentId',verifyToken,likeComment)
router.put('/editeComment/:commentId',verifyToken,editeComment)
router.delete('/deleteComment/:commentId',verifyToken,deleteComment)

export default router;
