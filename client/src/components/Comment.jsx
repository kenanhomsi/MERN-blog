import { useEffect, useState } from "react"
import {FaThumbsUp} from 'react-icons/fa'
import {useSelector} from 'react-redux'
import {Textarea ,Button} from 'flowbite-react'
import monent from 'moment'
export default function Comment({comment,onlike,onSave}) {
  const {currentUser}=useSelector((state)=>state.user);
  const [isEditing,setisEditing]=useState(false);
  const [editedContent,seteditedContent]=useState(comment.content);

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
  const handleEditeComment=()=>{
    setisEditing(true);
    seteditedContent(comment.content);
  }
  const handelSave=async()=>{
    try{
      const res=await fetch(`/api/comment/editeComment/${comment._id}`,{
        method:'PUT',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({
          content:editedContent
        })
      });
      if(res.ok){
       setisEditing(false);
        onSave(comment,editedContent);
      }
    }catch(err)
    {
      console.log(err);
    }

  }
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
        {isEditing?(
       <>
         <Textarea 
        className="mb-2"
         value={editedContent}
         onChange={(e)=> seteditedContent(e.target.value)}/>
         <div className=" flex justify-end gap-2">
          <Button type="button" size='sm' gradientDuoTone={'purpleToBlue'} 
          onClick={handelSave}
          >Save</Button>
          <Button type="button" size='sm' gradientDuoTone={'purpleToBlue'} outline onClick={()=>setisEditing(false)}>Cancel</Button>
         </div>
       </>):(
          <>
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
            {
              currentUser && (currentUser._id === comment.userId || currentUser.isAdmin) &&
              <button className="text-gray-400 hover:text-blue-500" onClick={handleEditeComment}>
                Edite
              </button>
            }
          
          </div>
          </>
        )}
      </div>
    </div>
  )
}
