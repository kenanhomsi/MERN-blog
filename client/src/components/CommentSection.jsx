import {useSelector} from 'react-redux';
import { Link } from 'react-router-dom';
import {Alert, Button, Textarea,Spinner} from 'flowbite-react'
import { useState } from 'react';
export default function CommentSection({postId}) {
  const {currentUser}=useSelector((state)=>state.user);
  const [comment,setComment]=useState('');
  const [commentError,setCommentError]=useState(null);
  const [loading,setLoading]=useState(false);

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
            console.log(data);
            setCommentError(null);
        setLoading(false);
        }
        setLoading(false);

    }catch(err){
        setCommentError(err);
        setLoading(false);
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
    </div>
  )
}
