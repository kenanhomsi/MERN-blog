import express from 'express'
import { createComment ,getPostComments,likeComment,editeComment} from '../controllers/comment.conteoller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router=express.Router();

router.post('/create',verifyToken,createComment);
router.get('/getPostComments/:postId',getPostComments);
router.put('/likeComment/:commentId',verifyToken,likeComment)
router.put('/editeComment/:commentId',verifyToken,editeComment)

export default router;
