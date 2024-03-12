import { useEffect, useState } from "react"
import monent from 'moment'
export default function Comment({comment}) {
  const [User,setUser]=useState({});
  useEffect(()=>{
    console.log(comment.userId);
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
  console.log(User);
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
      </div>
    </div>
  )
}
