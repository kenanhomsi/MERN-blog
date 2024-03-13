import { useEffect, useState } from "react"
import {FaThumbsUp} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import monent from 'moment'
export default function Comment({comment,onlike}) {
  const {currentUser}=useSelector((state)=>state.user);
  const [User,setUser]=useState({});
  useEffect(()=>{
   const getUser=async()=>{
    try{
      const res=await fetch(`/api/user/${comment.userId}`);
      const data=await res.json();
      if(res.ok){
        setUser(data);
      }
    }catch(err){
      console.log(err);
    }
   }
   getUser();
    
  },[comment])
  return (
    <div className="flex p-4 border-b dark:border-gray-600 text-sm">
      <div className=" flex shrink-0 mr-3">
        <img src={User.profilePicture} alt={User.username} className="w-10 h-10  bg-gray-500 rounded-full" />
      </div>
      <div className=" flex-1">
        <div className=" flex  items-center  mb-1">
          <span className=" font-bold mr-1 text-xs truncate">{User ?`@${User.username}`:'anonymous User'}</span>
          <span className="text-gray-500 text-xs">{monent(comment.createdAt).fromNow()}</span>
        </div>
        <p className="text-gray-500 mb-2">{comment.content}</p>
        <div className=" flex gap-2  items-center pt-2 text-xs border-t dark:border-gray-700 max-w-fit" >
          <button type="button" onClick={()=>onlike(comment._id)}
          className={`  hover:text-blue-500 ${currentUser && comment.likes.includes(currentUser._id) ? 'text-blue-500':'text-gray-400'}`}>
          <FaThumbsUp  className=" text-sm"/>
          </button>
          <p className=" text-gray-400">
            {comment.numberOfLikes > 0 &&  comment.numberOfLikes + " "+
            (comment.numberOfLikes ===1 ? 'like': 'likes')}
          </p>
        
        </div>
      </div>
    </div>
  )
}
