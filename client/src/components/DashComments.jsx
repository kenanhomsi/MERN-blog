
import {useEffect,useState} from 'react'
import {useSelector} from 'react-redux'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {Button, Table, TableBody,Modal,ModalHeader,ModalBody,TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
export default function DashComments() {
  const {currentUser}=useSelector((state)=>state.user);
  const[Comments,setComments]=useState([]);
  const[showMore,setShowMore]=useState(true);
  const[showModel,setShowModel]=useState(false);
  const[commentIdToDelete,setcommentIdToDelete]=useState(null);

  useEffect(()=>{
    const fetchUsers=async()=>{
      try{
        const res=await fetch(`/api/comment/getComments/`)
        const data =await res.json();
        if(res.ok){
          setComments(data.comments);
          if(data.comments.length < 9){
            setShowMore(false);
          }
        }
      }catch(err){
        console.log(err)
      }
      
   }
   if(currentUser.isAdmin){
    fetchUsers();
  }

  },[currentUser._id]);

  const handleShowMore= async()=>{
    const startIndex=Comments.length;
    console.log(startIndex);
    try{
      const res=await fetch(`/api/comment/getComments/?startIndex=${startIndex}`);
      const data =await res.json();
      console.log(data);
      if(res.ok){
        setComments((pre)=>[...pre,...data.comments]);
        if(data.comments.length < 9){
          setShowMore(false);
        }
      }
      
    }catch(err){
      console.log(err)
    }
  }


const handleDeleteComment=async()=>{
  try{
      const res=await fetch(`/api/comment/deleteComment/${commentIdToDelete}`,{method:'DELETE'});
      const data= await res.json();
      if(res.ok){
        setComments((pre)=>pre.filter((comment)=> comment._id !== commentIdToDelete))
        setShowModel(false);
      }else{
        console.log(data.message);
      }
  }catch(err){
    console.log(err);
    setShowModel(false);
  }
}
  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-100 dark:scrollbar-thumb-slate-500'> 
      { currentUser.isAdmin   && Comments.length > 0 ? (
        <>
          <Table hoverable className=' shadow-md'>
            <TableHead>
              <TableHeadCell>Date updated</TableHeadCell>
              <TableHeadCell>comment content</TableHeadCell>
              <TableHeadCell>number of likes</TableHeadCell>
              <TableHeadCell>postId</TableHeadCell>
              <TableHeadCell>userId</TableHeadCell>
              <TableHeadCell>delete</TableHeadCell>
            </TableHead>
            <TableBody  className=' divide-y'>
            {
              Comments.map((comment,index)=>
               (
                  <TableRow className='bg-white dark:bg-gray-800 dark:border-gray-700' key={index}>
                    <TableCell>
                      {new Date(comment.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                        {comment.content}
                    </TableCell>
                    <TableCell>
                    {comment.numberOfLikes}
                    </TableCell>
                    <TableCell>
                    {comment.postId}
                    </TableCell>
                    <TableCell>{comment.userId}</TableCell>
                    <TableCell><span onClick={()=>{
                      setShowModel(true);
                      setcommentIdToDelete(comment._id);
                    }
                      } className=' font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></TableCell>
                    
                  </TableRow>
               )
               )
              }
              </TableBody>
          </Table>
          {showMore && <button onClick={handleShowMore} className='w-full text-teal-500 text-sm py-7 self-center'>show more</button>}
        </>
      ):(
        <p>you have no comments yet!</p>
      )}
        <Modal show={showModel} popup onClose={()=> setShowModel(false)} size='md'>
            <ModalHeader />
            <ModalBody>
                <div className=" text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want do delete this comment ?</h3>
                    <div className=" flex justify-center gap-4">
                        <Button color='failure' onClick={handleDeleteComment} >yes ,I'am sure</Button>
                        <Button color='gray' onClick={()=>setShowModel(false)}>No ,Cancel</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
      </div>
  )
}
