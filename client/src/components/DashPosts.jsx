import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {HiOutlineExclamationCircle} from 'react-icons/hi'
import {Button, Table, TableBody,Modal,ModalHeader,ModalBody,TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
export default function DashPosts() {
  const {currentUser}=useSelector((state)=>state.user);
  const[userPosts,setUserPosts]=useState([]);
  const[showMore,setShowMore]=useState(true);
  const[showModel,setShowModel]=useState(false);
  const[PostIdToDelete,setPostIdToDelete]=useState(null);
  useEffect(()=>{
    const fetchPosts=async()=>{
      try{
        const res=await fetch(`/api/post/getposts/?userId=${currentUser._id}`)
        const data =await res.json();
        if(res.ok){
          setUserPosts(data.posts);
          if(data.posts.length < 9){
            setShowMore(false);
          }
        }
        
      }catch(err){
        console.log(err)
      }
      
   }
   if(currentUser.isAdmin){
    fetchPosts();
  }

  },[currentUser._id]);

  const handleShowMore= async()=>{
    const startIndex=userPosts.length;
    try{
      const res=await fetch(`/api/post/getposts/?userId=${currentUser._id}&startIndex=${startIndex}`)
      const data =await res.json();

      if(res.ok){
        setUserPosts((pre)=>[...pre,...data.posts]);
        if(data.posts.length < 9){
          setShowMore(false);
        }
      }
      
    }catch(err){
      console.log(err)
    }
  }


  const handleDeletePost = async () => {
    setShowModel(false);
    try {
      const res = await fetch(
        `/api/post/deletepost/${PostIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserPosts((prev) =>
          prev.filter((post) => post._id !== PostIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-100 dark:scrollbar-thumb-slate-500'> 
      { currentUser.isAdmin   && userPosts.length > 0 ? (
        <>
          <Table hoverable className=' shadow-md'>
            <TableHead>
              <TableHeadCell>Date Updated</TableHeadCell>
              <TableHeadCell>Post Image</TableHeadCell>
              <TableHeadCell>Post Title</TableHeadCell>
              <TableHeadCell>category</TableHeadCell>
              <TableHeadCell>delete</TableHeadCell>
              <TableHeadCell><span>edit</span></TableHeadCell>
            </TableHead>
            <TableBody  className=' divide-y'>
            {
              userPosts.map((post,index)=>
               (
                  <TableRow className='bg-white dark:bg-gray-800 dark:border-gray-700' key={index}>
                    <TableCell>
                      {new Date(post.updatedAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                        <Link to={`/post/${post.slug}`}>
                            <img src={post.image} alt={post.title} className=' w-20 h-10 object-cover bg-gray-500' />
                        </Link>
                    </TableCell>
                    <TableCell>
                    <Link className=' font-medium text-gray-900 dark:text-white' to={`/post/${post.slug}`}>{post.title}</Link>
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell><span onClick={()=>{
                      setShowModel(true);
                      setPostIdToDelete(post._id);
                    }
                      } className=' font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></TableCell>
                    <TableCell>
                      <Link className=' text-teal-500 hover:underline' to={`/update-post/${post._id}`}>
                          <span>Edite</span>
                      </Link>
                    </TableCell>
                  </TableRow>
               )
               )
              }
              </TableBody>
          </Table>
          {showMore && <button onClick={handleShowMore} className='w-full text-teal-500 text-sm py-7 self-center'>show more</button>}
        </>
      ):(
        <p>you have no posts yet!</p>
      )}
        <Modal show={showModel} popup onClose={()=> setShowModel(false)} size='md'>
            <ModalHeader />
            <ModalBody>
                <div className=" text-center">
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure you want do delete this post ?</h3>
                    <div className=" flex justify-center gap-4">
                        <Button color='failure' onClick={handleDeletePost}>yes ,I'am sure</Button>
                        <Button color='gray' onClick={()=>setShowModel(false)}>No ,Cancel</Button>
                    </div>
                </div>
            </ModalBody>
        </Modal>
      </div>
  )
}
