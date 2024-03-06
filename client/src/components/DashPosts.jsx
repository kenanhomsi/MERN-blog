import {useEffect,useState} from 'react'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow} from 'flowbite-react'
export default function DashPosts() {
  const {currentUser}=useSelector((state)=>state.user);
  const[userPosts,setUserPosts]=useState({});
  useEffect(()=>{
    const fetchPosts=async()=>{
      try{
        const res=await fetch(`/api/post/getposts/?userId=${currentUser._id}`)
        const data =await res.json();
        if(res.ok){
          setUserPosts(data.posts);
        }
        
      }catch(err){
        console.log(err)
      }
      
   }
   if(currentUser.isAdmin){
    fetchPosts();
  }

  },[currentUser._id]);
  // console.log(userPosts.posts)
  // console.log(Object.keys(userPosts).length)

  return (
    <div className=' table-auto overflow-x-scroll md:mx-auto p-3 scrollbar  scrollbar-track-slate-100 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-100 dark:scrollbar-thumb-slate-500'> 
      { currentUser.isAdmin  && userPosts.length > 0 ? (
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
                    <TableCell><span className=' font-medium text-red-500 hover:underline cursor-pointer'>Delete</span></TableCell>
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
        </>
      ):(
        <p>you have no posts yet!</p>
      )}
      </div>
  )
}
