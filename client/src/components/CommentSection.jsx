import {useSelector} from 'react-redux';
import { Link ,useNavigate } from 'react-router-dom';
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {Alert, Button, Textarea,Spinner,Modal,ModalHeader,ModalBody} from 'flowbite-react'
import { useEffect, useState } from 'react';
import Comment from './Comment';
export default function CommentSection({postId}) {
  const {currentUser}=useSelector((state)=>state.user);
  const [comment,setComment]=useState('');
  const [commentError,setCommentError]=useState(null);
  const [loading,setLoading]=useState(false);
  const [comments,setComments]=useState([]);
  const [showModel,setShowModel]=useState(false);
  const [deletedCommentId,setDeletedCommentId]=useState(null);
  const [deletedCommentError,setDeletedCommentError]=useState(null);

  const navigate=useNavigate();
    useEffect(()=>{
        const fetchComments=async()=>{
            try{
                    const res=await fetch(`/api/comment/getPostComments/${postId}`);
                    const data=await res.json();
                    if(res.ok){
                        return setComments(data);
                    }
                    else{
                        return console.log('err =',data.message);
                    }
            }catch(err){
                console.log(err);
            }
        }
        fetchComments();
    },[postId]);
  const handleSubmint= async(e)=>{
    e.preventDefault();
    setLoading(true);
    try{
        if(comment.length > 200){
            return;
        }
        const res = await fetch('/api/comment/create',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({content:comment,postId,userId:currentUser._id})
        })
        const data=await res.json();
        if(res.ok){
            setComment('');
            setCommentError(null);
            setComments([data,...comments]);
        setLoading(false);
        }
        setLoading(false);

    }catch(err){
        setCommentError(err);
        setLoading(false);
    }
  }
  const handleLike=async(commentId)=>{
        try{
            if(!currentUser){
                return navigate('/sign-up');  
            }
            const res=await fetch(`/api/comment/likeComment/${commentId}`,{method:'PUT'});
            const data=await res.json();
            if(res.ok){
                setComments(comments.map((com)=>
                com._id === commentId ?({
                        ...com,
                        likes:data.likes,
                        numberOfLikes:data.likes.length
                    }) : com
                ))
            }
        }catch(err){
            console.log(err);
        }
  }
const handelSaveEdite=async(comment,editedcontent)=>{
   setComments(comments.map((c)=>
   c._id ===comment._id ? {...c,content:editedcontent}:c
   ));
}
const handelDelete= async(commentId)=>{
    setShowModel(false);

    try{
        if(!currentUser){
            return navigate('/sign-in');
        }
        const res=await fetch(`/api/comment/deleteComment/${commentId}`,{method:'DELETE'});
        if(res.ok){
        setComments(comments.filter((com)=> com._id !== commentId))
        // setDeletedCommentId(null);

        }
        else{
            const data=await res.json();
            setDeletedCommentError(data.message);
        }

    }catch(err){
        setDeletedCommentError(err.message);
        console.log(err);
        // setDeletedCommentId(null);

    }
}
  return (
    <div className='max-w-2xl mx-auto w-full p-3'>
        {currentUser ?(
            <div className=' flex items-center gap-1 my-5  text-gray-500 text-sm'> 
                <p>Signed in as :</p>
                <img className=' h-5 w-5 object-cover rounded-full ' src={currentUser.profilePicture} alt={`${currentUser.username} picture` } />
                <Link className='text-xs text-cyan-600 hover:underline' to={'/dashboard/?tab=profile'}>
                @{currentUser.username}
                </Link>
            </div>
        ):(
            <div className=' text-sm text-teal-500 my-5 flex gap-1'>
                You must be signed in to comment.
                <Link className='text-blue-800 hover:underline' to={'/sign-in'}>
                Sign In
                </Link>
            </div>
        )}
        {currentUser && (
            <form  onSubmit={handleSubmint} className=' border border-teal-500 rounded-md p-3'>
                <Textarea onChange={(e)=> setComment(e.target.value)} maxLength='200' value={comment} placeholder=' Add a comment ...' rows='3' />
                <div className=" flex justify-between items-center mt-5">
                    <p className=' text-gray-500 text-sm'>{200 - comment.length} characters remaining</p>
                    <Button outline type='submit' gradientDuoTone='purpleToBlue'>{
                    loading?<Spinner />:
                    ('Submit')
                    }</Button>
                </div>
              {  commentError && <Alert color='failure' className='mt-5'>
                    {commentError}
                </Alert>}
            </form>
        )}
        {
            comments.length ===0?(
                <p className='text-sm my-5'>No Comments Yet</p>
            ):(<>
                <div className=" text-sm flex items-center gap-1 my-5">
                    <p>Comments</p>
                    <div className=" border border-gray-500 py-1 px-2 rounded-sm">
                        <p>{comments.length}</p>
                    </div>
                </div>
                {comments.map((comment)=>(
                    <Comment key={comment._id} comment={comment} onDelete={(commentId)=>{
                        setShowModel(true);
                        setDeletedCommentId(commentId);
                    }} onSave={handelSaveEdite} onlike={handleLike} />
                ))}
                </>
            )
        }
        <Modal show={showModel} popup onClose={()=> setShowModel(false)} size='md'>
            <ModalHeader />
            <ModalBody>
                <div className=" text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want do delete this comment ?</h3>
                    <div className=" flex justify-center gap-4">
                        <Button color='failure'  onClick={()=>handelDelete(deletedCommentId)}>yes ,I&apos;am sure</Button>
                        <Button color='gray' onClick={()=>setShowModel(false)}>No ,Cancel</Button>
                    </div>
                </div>
                {deletedCommentError && <Alert color='failure'>{deletedCommentError} </Alert>}
            </ModalBody>
        </Modal>
    </div>
  )
}
